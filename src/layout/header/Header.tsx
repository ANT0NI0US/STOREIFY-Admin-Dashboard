import { useState } from "react";
import ToggleSidebar from "./ToggleSidebar";
import SmallScreenSidebar from "../sidebar/SmallScreenSidebar";
import DarkModeButton from "@/layout/header/DarkModeButton";
import ProfilePhoto from "./ProfilePhoto";

export default function Header() {
  const [showSidebar, setShowSidebar] = useState(false);
  const toggleSidebar = () => setShowSidebar((prev) => !prev);
  const closeSidebar = () => setShowSidebar(false);
  return (
    <>
      <header className="bg-primary-light-color dark:bg-primary-dark-color flex h-[70px] items-center justify-between border-b px-[20px] shadow-md">
        <ToggleSidebar toggleSidebar={toggleSidebar} />
        <div className="ms-auto flex gap-2">
          <DarkModeButton />
          <ProfilePhoto />
        </div>
      </header>

      <SmallScreenSidebar
        showSidebar={showSidebar}
        closeSidebar={closeSidebar}
      />
    </>
  );
}
