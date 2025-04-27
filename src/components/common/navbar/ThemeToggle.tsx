// React
import { useEffect } from "react";
// Third-Party =====> Redux
import { useAppDispatch, useAppSelector } from "@redux/hooks";
import { selectCurrentTheme, setTheme } from "@redux/slices/app/appSlice";
// Icons
import { HiSun } from "react-icons/hi";
import { LuMoon } from "react-icons/lu";

const ThemeToggle = () => {
  // ################### REDUX HOOKS ###################
  const dispatch = useAppDispatch();
  const theme = useAppSelector(selectCurrentTheme);

  // ################### HANDLER ###################
  const handleToggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    dispatch(setTheme(newTheme));
  };

  const updateTheme = (theme: string) => {
    const root = window.document.documentElement;
    root.classList.toggle("light", theme === "light");
    root.classList.toggle("dark", theme === "dark");
    localStorage.setItem("theme", theme);
  };

  // ################### SIDE EFFECT ###################
  useEffect(() => {
    updateTheme(theme);
  }, [theme]);

  return (
    <button className="navbar-icon" onClick={handleToggleTheme}>
      {theme === "light" ? <HiSun /> : <LuMoon />}
    </button>
  );
};

export default ThemeToggle;
