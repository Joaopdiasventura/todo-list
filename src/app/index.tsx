import React from "react";
import { ThemeProvider } from "./shared/context/ThemeContext";
import HomePage from "./pages/home"

export default function App() {
  return (
    <ThemeProvider>
      <HomePage />
    </ThemeProvider>
  );
}
