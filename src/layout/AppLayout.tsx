import { Outlet } from "react-router-dom";
import Sidebar from "./sidebar/Sidebar";
import Header from "./header/Header";

export default function AppLayout() {
  return (
    <div className="bg-primary-light-color dark:bg-primary-dark-color text-text-light-color dark:text-text-dark-color">
      <div className="flex">
        <Sidebar />
        <div className="w-full md:w-[calc(100%-300px)]">
          <Header />
          <main className="bg-secondary-light-color dark:bg-secondary-dark-color h-[calc(100vh-70px)] overflow-auto p-3.5 md:p-5">
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  );
}
