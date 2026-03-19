const script = `(() => {
  try {
    const root = document.documentElement;
    const theme = 'dark';
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
