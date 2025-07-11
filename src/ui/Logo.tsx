import { Link } from "react-router-dom";

interface LogoProps {
  closeSmallSidebar?: () => void;
}

export default function Logo({ closeSmallSidebar }: LogoProps) {
  return (
    <Link
      to="/"
      className="flex items-center gap-0.5"
      onClick={closeSmallSidebar}
    >
      <img
        loading="lazy"
        className="max-h-full w-9 sm:w-11"
        src="https://i.ibb.co/ZS4YhxK/storeify-logo.webp"
        alt="Storeify-logo"
      />
      <h1 className="text-text-light-color dark:text-text-dark-color font-Merienda text-base font-extrabold sm:text-xl">
        TOREIFY
      </h1>
    </Link>
  );
}
