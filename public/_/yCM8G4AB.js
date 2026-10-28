const clamp = (value, minimum = 0, maximum = 1) =>
  value < minimum ? minimum : value > maximum ? maximum : value;

const lerp = (from, to, amount) => from + (to - from) * amount;

const smoothstep = (edge0, edge1, value) => {
  const amount = clamp((value - edge0) / (edge1 - edge0));
  return amount * amount * (3 - 2 * amount);
};

const fract = (value) => value - Math.floor(value);
const damp = (from, to, speed, delta) => lerp(from, to, 1 - Math.exp(-speed * delta));

const resolved = new Set();
const resolveUrl = (path) =>
  import.meta.resolve ? import.meta.resolve('/' + path) : new URL('/' + path, import.meta.url).href;

async function preload(importer, dependencies) {
  if (dependencies?.length) {
    const links = [...document.getElementsByTagName('link')];
    await Promise.allSettled(
      dependencies.map((dependency) => {
        const href = resolveUrl(dependency);
        if (resolved.has(href) || links.some((link) => link.href === href)) return undefined;
        resolved.add(href);
        const link = document.createElement('link');
        const stylesheet = href.endsWith('.css');
        link.rel = stylesheet ? 'stylesheet' : 'modulepreload';
        if (!stylesheet) link.as = 'script';
        link.crossOrigin = '';
        link.href = href;
        document.head.append(link);
        if (!stylesheet) return undefined;
        return new Promise((resolve, reject) => {
          link.addEventListener('load', resolve, { once: true });
          link.addEventListener('error', reject, { once: true });
        });
      }),
    );
  }
  return importer();
}

const loadFonts = () =>
  Promise.all([
    document.fonts.load('40px "Saol Display"'),
    document.fonts.load('14px "Suisse Intl"'),
    document.fonts.load('11px "Suisse Intl Mono"'),
  ]);

const analyticsDisabled = () => undefined;

export {
  fract as a,
  analyticsDisabled as c,
  damp as i,
  preload as n,
  lerp as o,
  clamp as r,
  smoothstep as s,
  loadFonts as t,
};
