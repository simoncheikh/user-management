import { useEffect } from "react";
import { Routes } from "./routes/Routes";
import { useThemeStore } from "./stores/themeStore/themeStore";

function App() {
  const isDarkMode = useThemeStore((state) => state.isDarkMode);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  return <Routes />;
}

export default App;
