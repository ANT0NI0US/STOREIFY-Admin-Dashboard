import { LuSunMoon } from "react-icons/lu";
import { FaMoon } from "react-icons/fa";
import { useDarkMode } from "@/hooks/useDarkMode";

interface DarkModeButtonProps {
  styles?: string;
}

export default function DarkModeButton({ styles = "" }: DarkModeButtonProps) {
  const { isDarkMode, toggleDarkMode } = useDarkMode();

  return (
    <button
      aria-label={isDarkMode ? "Light Mode" : "Dark Mode"}
      title={isDarkMode ? "Light Mode" : "Dark Mode"}
      onClick={toggleDarkMode}
      className={`flexCenter bg-secondary-dark-color dark:bg-secondary-light-color size-8 cursor-pointer rounded-full p-2 text-xl sm:size-10 ${styles}`}
    >
      {isDarkMode ? <LuSunMoon color="#FDB813" /> : <FaMoon color="#F6F1D5" />}
    </button>
  );
}
