import { NavLink } from "react-router-dom";
import Logo from "@/ui/Logo";
import { adminLinks } from "./links";

export default function Sidebar() {
  return (
    <div className="bg-primary-light-color dark:bg-primary-dark-color hidden w-[300px] border-r md:block">
      {/* Logo Image */}
      <div className="flexCenter h-[100px] border-b">
        <Logo />
      </div>
      {adminLinks.map(({ icon: Icon, href, title }) => {
        return (
          <div
            key={href}
            className="flex w-full cursor-pointer items-center justify-between border-b font-medium transition-all"
            title={title}
          >
            <NavLink
              className={({ isActive }) =>
                `flex w-full items-center justify-center gap-2.5 p-4 md:justify-start ${
                  isActive
                    ? "bg-accent-light-color dark:bg-accent-dark-color font-extrabold"
                    : "text-text-light-color dark:text-text-dark-color font-medium"
                }`
              }
              to={href}
            >
              <Icon className="text-2xl md:text-xl" />
              <span>{title}</span>
            </NavLink>
          </div>
        );
      })}
    </div>
  );
}
