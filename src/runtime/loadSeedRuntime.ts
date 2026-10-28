const RUNTIME_ID = 'promptedsite-seed-runtime';

declare global {
  interface Window {
    __seedRuntimePromise?: Promise<void>;
  }
}

export function loadSeedRuntime(): Promise<void> {
  if (window.__seedRuntimePromise) return window.__seedRuntimePromise;

  window.__seedRuntimePromise = new Promise<void>((resolve, reject) => {
    const existing = document.getElementById(RUNTIME_ID) as HTMLScriptElement | null;
    if (existing) {
      if (existing.dataset.loaded === 'true') resolve();
      else {
        existing.addEventListener('load', () => resolve(), { once: true });
        existing.addEventListener('error', () => reject(new Error('Runtime failed to load.')), {
          once: true,
        });
      }
      return;
    }

    const script = document.createElement('script');
    script.id = RUNTIME_ID;
    script.type = 'module';
    script.src = '/_/DenPkkVr.js';
    script.addEventListener(
      'load',
      () => {
        script.dataset.loaded = 'true';
        resolve();
      },
      { once: true },
    );
    script.addEventListener('error', () => reject(new Error('Runtime failed to load.')), {
      once: true,
    });
    document.head.append(script);
  });

  return window.__seedRuntimePromise;
}
