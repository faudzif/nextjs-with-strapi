'use client'

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import moment from 'moment-timezone'; // Import Moment.js
type ThemeContextType = {
  theme: 'day' | 'night';
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

type ThemeProviderProps = {
  children: ReactNode;
};

export const ThemeProvider = ({ children }: ThemeProviderProps) => {
  const [theme, setTheme] = useState<'day' | 'night'>('day'); // default theme
  // Function to update theme based on the time
  const updateTheme = () => {
    // const hour = new Date().getHours();
    const ksaTime = moment().tz("Asia/Riyadh"); // Get KSA time
    const hour = ksaTime.hour();
    const newTheme = (hour >= 6 && hour < 18) ? 'day' : 'night'; // Day theme from 6 AM to 6 PM
    setTheme(newTheme);
  };

  // Set interval to check the time every second and update the theme
  useEffect(() => {
    updateTheme(); // Initial check
    const intervalId = setInterval(updateTheme, 1000); // Check every second
    return () => clearInterval(intervalId); // Cleanup interval on component unmount
  }, []);

  return (
    <ThemeContext.Provider value={{ theme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
