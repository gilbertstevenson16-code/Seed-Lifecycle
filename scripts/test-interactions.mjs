import { chromium } from '@playwright/test';

const baseUrl = process.env.BASE_URL || 'http://127.0.0.1:3140';
const browser = await chromium.launch({
  headless: true,
  args: ['--enable-webgl', '--use-gl=angle', '--use-angle=swiftshader', '--enable-unsafe-swiftshader'],
});

try {
  for (const profile of [
    { name: 'desktop', viewport: { width: 1440, height: 900 } },
    { name: 'mobile', viewport: { width: 390, height: 844 } },
  ]) {
    const page = await browser.newPage({ viewport: profile.viewport });
    const errors = [];
    const httpErrors = [];
    const mediaResponses = [];
    page.on('pageerror', (error) => errors.push(error.message));
    page.on('console', (message) => message.type() === 'error' && errors.push(message.text()));
    page.on('response', (response) => {
      if (response.status() >= 400) httpErrors.push(`${response.status()} ${response.url()}`);
      if (response.url().includes('cdn.promptedsite.com')) mediaResponses.push(response.status());
    });

    await page.goto(`${baseUrl}/?plant=4242`, { waitUntil: 'networkidle', timeout: 120_000 });
    await page.locator('[data-gate]').waitFor({ state: 'visible', timeout: 120_000 });
    await page.locator('[data-gate-silent]').click();
    await page.locator('[data-loader]').waitFor({ state: 'hidden', timeout: 15_000 });

    const chapterButtons = page.locator('[data-rail] button');
    if ((await chapterButtons.count()) !== 17) throw new Error(`${profile.name}: expected 17 chapters`);
    await page.keyboard.press('PageDown');
    await page.waitForTimeout(1_200);
    if ((await page.evaluate(() => scrollY)) === 0) throw new Error(`${profile.name}: keyboard navigation did not scroll`);

    await page.evaluate(() => scrollTo(0, document.documentElement.scrollHeight - innerHeight));
    await page.waitForTimeout(2_000);
    if (errors.length || httpErrors.length) {
      throw new Error(`${profile.name}: ${[...httpErrors, ...errors].join(' | ')}`);
    }
    if (!mediaResponses.length || mediaResponses.some((status) => status !== 200)) {
      throw new Error(`${profile.name}: media CDN verification failed`);
    }
    console.log(`${profile.name}: gate, 17 chapters, keyboard, scroll, WebGL, and R2 passed`);
    await page.close();
  }
} finally {
  await browser.close();
}
