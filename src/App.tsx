import { Outlet } from "react-router";
import { useEffect, useState } from "react";
import Header from "./components/Header";

function App() {
  const [dark, setDark] = useState(() => {
    return localStorage.theme === "dark" ||
      (!("theme" in localStorage) &&
        window.matchMedia("(prefers-color-scheme: dark)").matches)
      ? true
      : false;
  });

  useEffect(() => {
    if (dark) {
      document.documentElement.classList.add("dark");
      localStorage.theme = "dark";
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.theme = "light";
    }
  }, [dark]);

  const darkSetButton = () => {
    setDark((prevState) => !prevState);
  };
  return (
    <>
      <Header dark={dark} darkSetButton={darkSetButton} />
      <Outlet />
    </>
  );
}

export default App;
