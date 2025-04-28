import { useEffect } from "react";
import { Routes } from "./routes/Routes";
import { useThemeStore } from "./stores/themeStore/themeStore";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // Make sure to import the styles

function App() {
  const isDarkMode = useThemeStore((state) => state.isDarkMode);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  return (
    <>
      <Routes />
      <ToastContainer />
    </>
  );
}

export default App;
