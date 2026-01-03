// Theme switcher for Everforest light/dark modes

(function() {
  const STORAGE_KEY = 'theme-preference';

  // Get the current theme from localStorage or system preference
  function getThemePreference() {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      return stored;
    }

    // Check system preference
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      return 'dark';
    }

    return 'light';
  }

  // Apply theme to the document
  function applyTheme(theme) {
    if (theme === 'dark') {
      document.documentElement.setAttribute('data-theme', 'dark');
    } else {
      document.documentElement.removeAttribute('data-theme');
    }

    // Update checkbox state if it exists
    const toggle = document.getElementById('theme-toggle');
    if (toggle) {
      toggle.checked = theme === 'dark';
    }
  }

  // Toggle between themes
  function toggleTheme() {
    const current = getThemePreference();
    const next = current === 'dark' ? 'light' : 'dark';
    localStorage.setItem(STORAGE_KEY, next);
    applyTheme(next);
  }

  // Apply theme immediately to prevent flash
  applyTheme(getThemePreference());

  // Set up toggle switch when DOM is ready
  document.addEventListener('DOMContentLoaded', function() {
    const toggle = document.getElementById('theme-toggle');
    if (toggle) {
      // Set initial state
      const currentTheme = getThemePreference();
      toggle.checked = currentTheme === 'dark';

      // Listen for changes
      toggle.addEventListener('change', toggleTheme);
    }
  });

  // Listen for system theme changes
  if (window.matchMedia) {
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', function(e) {
      // Only auto-switch if user hasn't set a preference
      if (!localStorage.getItem(STORAGE_KEY)) {
        applyTheme(e.matches ? 'dark' : 'light');
      }
    });
  }
})();
