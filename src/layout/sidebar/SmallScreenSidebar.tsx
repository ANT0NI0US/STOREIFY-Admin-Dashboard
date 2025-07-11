import { NavLink } from "react-router-dom";
import { IoCloseSharp } from "react-icons/io5";
import { adminLinks } from "./links";
import Logo from "@/ui/Logo";
import { useOutsideClick } from "@/hooks/useOutsideClick";

interface SmallScreenSidebarProps {
  showSidebar: boolean;
  closeSidebar: () => void;
}

export default function SmallScreenSidebar({
  showSidebar,
  closeSidebar,
}: SmallScreenSidebarProps) {
  const ref = useOutsideClick(() => closeSidebar());

  return (
    showSidebar && (
      <div className="md:hidden">
        {/* OVERLAY */}
        <div className="fixed inset-0 z-100 h-full w-full bg-black/40 backdrop-blur-sm dark:bg-black/10" />

        {/* SIDEBAR */}
        <nav
          ref={ref}
          className="bg-primary-light-color dark:bg-primary-dark-color fixed start-0 bottom-0 z-101 h-full w-full pb-16 shadow-md drop-shadow-xl sm:w-[300px]"
        >
          {/* CLOSE SIDEBAR BUTTON*/}
          <div className="flex h-20 items-center justify-start px-2.5">
            <button
              aria-label="Close-icon"
              title="Close"
              onClick={closeSidebar}
            >
              <div className="flexCenter p-2">
                <IoCloseSharp size={20} />
              </div>
            </button>
          </div>

          <div className="flexCenter -mt-20 h-[100px] border-b">
            <Logo closeSmallSidebar={closeSidebar} />
          </div>

          {/* LINKS */}
          {adminLinks.map(({ icon: Icon, href, title }) => {
            return (
              <div
                key={href}
                className="border-accent-light-color dark:border-accent-dark-color flex w-full cursor-pointer items-center justify-between border-b font-medium transition-all"
              >
                <NavLink
                  className={({ isActive }) =>
                    `flex w-full items-center gap-2.5 p-4 md:justify-start ${
                      isActive
                        ? "bg-accent-light-color dark:bg-accent-dark-color font-extrabold"
                        : "text-text-light-color dark:text-text-dark-color font-medium"
                    }`
                  }
                  onClick={closeSidebar}
                  to={href}
                >
                  <Icon className="text-2xl md:text-xl" />
                  <span>{title}</span>
                </NavLink>
              </div>
            );
          })}
        </nav>
      </div>
    )
  );
}
