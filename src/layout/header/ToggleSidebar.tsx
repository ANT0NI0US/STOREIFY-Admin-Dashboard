import { GiHamburgerMenu } from "react-icons/gi";

interface ToggleSidebarProps {
  toggleSidebar: () => void;
}

export default function ToggleSidebar({ toggleSidebar }: ToggleSidebarProps) {
  return (
    <div className="flexCenter md:hidden">
      <button
        aria-label="Toggle-menu"
        title="Toggle menu"
        className="bg-accent-light-color dark:bg-accent-dark-color hover:bg-secondary-light-color dark:hover:bg-secondary-dark-color hover:text-accent-light-color dark:hover:text-accent-dark-color rounded-full p-2 transition-all"
        onClick={toggleSidebar}
      >
        <GiHamburgerMenu />
      </button>
    </div>
  );
}
