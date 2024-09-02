import { Link } from "react-router-dom";
import { MdDarkMode } from "react-icons/md";
import { IoIosSearch, IoMdSunny } from "react-icons/io";

interface HeaderProps {
  dark: boolean;
  darkSetButton: () => void;
}

export default function Header({ dark, darkSetButton }: HeaderProps) {
  return (
    <header className={`bg-white border-b-2 ${dark ? "dark" : ""}`}>
      <nav className="mx-auto flex max-w-7xl items-center justify-between p-4 lg:px-8">
        <div className="hidden lg:block lg:flex-1">
          <Link to="/" className="-m-1.5 p-1.5">
            <span className="text-xl italic font-bold text-purple-500">
              CalenDo
            </span>
          </Link>
        </div>

        <div className="flex items-center gap-x-3 w-7/12 relative lg:flex md:mx-auto">
          <div className="absolute left-2 top-[13px] ">
            <IoIosSearch />
          </div>
          <input
            className={`block w-full rounded-md border-2 py-1.5 pl-7 pr-20 placeholder:text-gray-400 lg:placeholder:text-lg ${
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
        <div className="flex items-center justify-end lg:flex-1 px-8">
          <button
            className={`font-semibold leading-6 text-gray-900  ${
              dark ? "dark" : ""
            }`}>
            Log in <span aria-hidden="true">&rarr;</span>
          </button>
        </div>
      </nav>
    </header>
  );
}
