import { useEffect } from 'react';

export function useChapterKeyboardNavigation() {
  useEffect(() => {
    const navigate = (event: KeyboardEvent) => {
      if (event.key !== 'PageDown' && event.key !== 'PageUp') return;
      const buttons = Array.from(
        document.querySelectorAll<HTMLButtonElement>('[data-rail] button'),
      );
      if (!buttons.length || !document.querySelector('[data-loader][hidden]')) return;

      const active = Math.max(
        0,
        buttons.findIndex((button) => button.getAttribute('aria-current') === 'step'),
      );
      const direction = event.key === 'PageDown' ? 1 : -1;
      const target = buttons[Math.min(buttons.length - 1, Math.max(0, active + direction))];
      if (target === buttons[active]) return;
      event.preventDefault();
      target.click();
    };

    window.addEventListener('keydown', navigate);
    return () => window.removeEventListener('keydown', navigate);
  }, []);
}
