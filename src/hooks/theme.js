import React, { createContext, useState, useContext, useMemo } from "react";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import {
  ThemeProvider as MuiThemeProvider,
  createMuiTheme,
} from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";

// THEMES
import lightTheme from "../styles/themes/light";
import darkTheme from "../styles/themes/dark";

const ThemeContext = createContext({});

function ThemeProvider({ children }) {
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");

  const [darkMode, setDarkMode] = useState(() => {
    const isDarkMode = JSON.parse(localStorage.getItem("isDarkMode"));

    if (prefersDarkMode || isDarkMode) return true;

    return false;
  });

  const toggleDarkMode = () => {
    const isDarkMode = !darkMode;

    localStorage.setItem("isDarkMode", JSON.stringify(isDarkMode));

    setDarkMode(isDarkMode);
  };

  const theme = useMemo(
    () => createMuiTheme(darkMode ? darkTheme : lightTheme),
    [darkMode]
  );

  return (
    <ThemeContext.Provider value={{ isDarkMode: darkMode, toggleDarkMode }}>
      <MuiThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </MuiThemeProvider>
    </ThemeContext.Provider>
  );
}

function useTheme() {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error("useTheme must be used within an ThemeProvider");
  }

  return context;
}

export { ThemeProvider, useTheme };
