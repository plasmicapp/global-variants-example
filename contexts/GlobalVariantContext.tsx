// (optional) persist theme preference in cookies
import { getCookie, setCookie } from 'cookies-next';
import React from 'react';

// Cookie name for theme preference
const THEME_COOKIE_NAME = 'plasmic-theme';

interface GlobalVariantContextType {
  isDarkMode: boolean;
  toggleDarkMode: () => void;
}

const defaultContextValue: GlobalVariantContextType = {
  isDarkMode: true, // Default to dark mode if not set
  toggleDarkMode: () => {}
};

const GlobalVariantContext = React.createContext<GlobalVariantContextType>(defaultContextValue);

export function GlobalVariantProvider({ children }: { children: React.ReactNode }) {
  // Load theme preference from cookie on mount
  const [isDarkMode, setIsDarkMode] = React.useState(false);

  React.useEffect(() => {
    const savedTheme = getCookie(THEME_COOKIE_NAME);
    setIsDarkMode(!savedTheme || savedTheme === 'dark');
  }, []);

  const toggleDarkMode = () => {
    setIsDarkMode((prev) => {
      // Save the new value to cookies
      setCookie(THEME_COOKIE_NAME, !prev ? 'dark' : 'light');
      return !prev;
    });
  };

  return (
    <GlobalVariantContext.Provider value={{ isDarkMode, toggleDarkMode }}>{children}</GlobalVariantContext.Provider>
  );
}

export const useGlobalVariant = () => {
  const context = React.useContext(GlobalVariantContext);
  return context || defaultContextValue; // fallback inside Studio preview
};