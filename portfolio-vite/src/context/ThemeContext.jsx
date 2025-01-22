import React, { createContext, useContext, useState, useEffect } from 'react';
import { theme as antTheme } from 'antd';

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(true);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.setAttribute('data-theme', !isDarkMode ? 'dark' : 'light');
  };

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', isDarkMode ? 'dark' : 'light');
  }, []);

  const theme = {
    algorithm: isDarkMode ? antTheme.darkAlgorithm : antTheme.defaultAlgorithm,
    token: {
      colorPrimary: '#1668dc',
      borderRadius: 8,
      colorBgContainer: isDarkMode ? '#1f1f1f' : '#ffffff',
      colorBgElevated: isDarkMode ? '#1f1f1f' : '#ffffff',
      colorBorder: isDarkMode ? 'rgba(255, 255, 255, 0.1)' : '#e8e8e8',
    },
    components: {
      Layout: {
        colorBgBody: isDarkMode ? '#121212' : '#ffffff',
      },
      Menu: {
        colorItemBg: isDarkMode ? '#121212' : '#ffffff',
        colorSubItemBg: isDarkMode ? '#121212' : '#ffffff',
        colorItemText: isDarkMode ? '#ffffff' : '#000000',
        colorItemTextHover: '#1668dc',
        colorItemTextSelected: '#1668dc',
      },
      Card: {
        colorBgContainer: isDarkMode ? '#1f1f1f' : '#ffffff',
        colorBorderSecondary: isDarkMode ? 'rgba(255, 255, 255, 0.1)' : '#e8e8e8',
      },
    },
  };

  return (
    <ThemeContext.Provider value={{ isDarkMode, toggleTheme, theme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
