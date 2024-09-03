import { MdDarkMode } from "react-icons/md";
import { IoIosSearch, IoMdSunny } from "react-icons/io";

interface HeaderProps {
  dark: boolean;
  darkSetButton: () => void;
}

export default function Header({ dark, darkSetButton }: HeaderProps) {
  return (
    <header className={`bg-white w-11/12 ${dark ? "dark" : ""}`}>
      <nav className="flex items-center justify-between py-4 mx-auto">
        <div className="flex items-center gap-x-3 w-7/12 relative lg:flex ">
          <div className="absolute left-2 top-[13px] ">
            <IoIosSearch />
          </div>
          <input
            className={`placeholder-opacity-0 block w-full rounded-md border-2 py-1.5 pl-7  ${
              dark ? "dark" : ""
            }`}
            placeholder="search"
          />
          <div
            onClick={darkSetButton}
            className="flex items-center justify-center">
            {dark ? (
              <IoMdSunny className="darkMode__icon" />
            ) : (
              <MdDarkMode className="darkMode__icon" />
            )}
          </div>
        </div>
        <div className="flex items-center justify-end text-sm">
          <button
            className={`font-semibold leading-6 text-gray-900 ${
              dark ? "dark" : ""
            }`}>
            Login{" "}
            <span aria-hidden="true" className="hidden lg:inline-block">
              &rarr;
            </span>
          </button>
        </div>
      </nav>
    </header>
  );
}
