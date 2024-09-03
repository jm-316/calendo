import { Link } from "react-router-dom";
import { TiHomeOutline } from "react-icons/ti";
import { FaRegCalendarAlt } from "react-icons/fa";
import { LuListTodo } from "react-icons/lu";

export default function Sidebar() {
  return (
    <div className="flex w-20 lg:w-64">
      <div className="flex pl-3 pr-3">
        <section className="flex flex-col w-14 lg:w-52">
          <div className="invisible mt-4 mb-20 mr-44 p-4 lg:ml-10 lg:visible">
            <Link to="/" className="-m-1.5 p-1.5">
              <span className="text-sm italic font-bold text-purple-500 lg:text-xl">
                CalenDo
              </span>
            </Link>
          </div>
          <ul className="flex flex-1 flex-col ml-1.5">
            <li className="mb-8">
              <Link to="/" className="nav__list select">
                <TiHomeOutline className="w-6 h-6 shrink-0" />
                <span className="hidden lg:block lg:w-36">Dashboard</span>
              </Link>
            </li>
            <li className="mb-8">
              <Link to="/calendars" className="nav__list">
                <FaRegCalendarAlt className="w-6 h-6 shrink-0" />
                <span className="hidden lg:block w-40">Calendar</span>
              </Link>
            </li>
            <li>
              <Link to="/todos" className="nav__list">
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
