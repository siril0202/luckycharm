import { useState, useEffect } from 'react';

export function useTheme() {
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('lucky-dangle-theme') || 'auto';
  });

  useEffect(() => {
    localStorage.setItem('lucky-dangle-theme', theme);
    const root = window.document.documentElement;

    if (theme === 'auto') {
      root.removeAttribute('data-theme');
    } else {
      root.setAttribute('data-theme', theme);
    }
  }, [theme]);

  return [theme, setTheme];
}
