const script = `(() => {
  try {
    const storageKey = 'captionwizard_theme';
    const root = document.documentElement;
    const stored = window.localStorage.getItem(storageKey);
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const theme = stored === 'light' || stored === 'dark' ? stored : (prefersDark ? 'dark' : 'light');
    root.classList.remove('light', 'dark');
    root.classList.add(theme);
    root.setAttribute('data-theme', theme);
    root.style.colorScheme = theme;
  } catch (error) {
    console.warn('Theme init failed', error);
  }
})();`

export default function ThemeScript() {
  return <script id="theme-init" dangerouslySetInnerHTML={{ __html: script }} />
}
