import { Link } from "react-router-dom";
import { TiHomeOutline } from "react-icons/ti";
import { FaRegCalendarAlt } from "react-icons/fa";
import { LuListTodo } from "react-icons/lu";
import { useState } from "react";

type NavType = "Dashboard" | "Calendar" | "Todo";

export default function Sidebar() {
  const [selected, setSelected] = useState<NavType>("Dashboard");

  const handleSelect = (name: NavType) => {
    setSelected(name);
  };

  return (
    <div className="flex w-20 lg:w-64">
      <div className="flex pl-3 pr-3">
        <section className="flex flex-col w-14 lg:w-52">
          <div className="invisible mt-4 mb-20 mr-44 p-4 lg:ml-10 lg:visible">
            <Link
              to="/"
              className="-m-1.5 p-1.5"
              onClick={() => handleSelect("Dashboard")}>
              <span className="text-sm italic font-bold text-purple-500 lg:text-xl">
                CalenDo
              </span>
            </Link>
          </div>
          <ul className="flex flex-1 flex-col ml-1.5">
            <li className="mb-8">
              <Link
                to="/"
                className={`nav__list ${
                  selected === "Dashboard" ? "select" : ""
                } `}
                onClick={() => handleSelect("Dashboard")}>
                <TiHomeOutline className="w-6 h-6 shrink-0" />
                <span className="hidden lg:block lg:w-36">Dashboard</span>
              </Link>
            </li>
            <li className="mb-8">
              <Link
                to="/calendars"
                className={`nav__list ${
                  selected === "Calendar" ? "select" : ""
                } `}
                onClick={() => handleSelect("Calendar")}>
                <FaRegCalendarAlt className="w-6 h-6 shrink-0" />
                <span className="hidden lg:block w-40">Calendar</span>
              </Link>
            </li>
            <li>
              <Link
                to="/todos"
                className={`nav__list ${selected === "Todo" ? "select" : ""} `}
                onClick={() => handleSelect("Todo")}>
                <LuListTodo className="w-6 h-6 shrink-0" />
                <span className="hidden lg:block w-40">To do</span>
              </Link>
            </li>
          </ul>
        </section>
      </div>
    </div>
  );
}
