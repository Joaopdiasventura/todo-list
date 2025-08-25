import "../global.css";
import { Stack } from "expo-router";
import { ThemeProvider } from "./shared/context/ThemeContext";

export default function Layout() {
  return (
    <ThemeProvider>
      <Stack screenOptions={{ headerShown: false }} />
    </ThemeProvider>
  );
}
