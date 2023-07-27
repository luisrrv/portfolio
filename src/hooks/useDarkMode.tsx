import { useState, useEffect } from 'react';

const useDarkMode = () => {
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);

  useEffect(() => {
    const darkModeMediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

    const handleDarkModeChange = (e: MediaQueryListEvent) => {
      setIsDarkMode(e.matches);
      document.body.classList.toggle('dark', e.matches);
    };

    // Check the initial system preference and set the dark mode accordingly
    setIsDarkMode(darkModeMediaQuery.matches);
    document.body.classList.toggle('dark', darkModeMediaQuery.matches);

    // Add an event listener to detect changes in system preference
    darkModeMediaQuery.addEventListener('change', handleDarkModeChange);

    // Clean up the event listener on unmount
    return () => {
      darkModeMediaQuery.removeEventListener('change', handleDarkModeChange);
    };
  }, []);

  return isDarkMode;
};

export default useDarkMode;
