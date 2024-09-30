import { format, getDay } from "date-fns";
import { useSelector } from "react-redux";
import { useCalendars } from "../../hook/useCalendars";
import { selectCurrentDate } from "../../slices/schedulerSlice";
import { useCalendarEvents } from "../../hook/useCalendarEvents";

const WEEK = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

export default function DateHeader() {
  const currentDate = useSelector(selectCurrentDate);
  const { calendars } = useCalendars();
  const { createMonth } = useCalendarEvents(calendars);

  return (
    <div className="flex w-full">
      <div className="flex flex-grow">
        <div className="w-[5rem]" />
        {createMonth
          .filter(
            (day) =>
              format(day, "yyyy-MM-dd") === format(currentDate, "yyyy-MM-dd")
          )
          .map((day, index) => (
            <div className="flex flex-col flex-grow text-center" key={index}>
              <div className="text-lg font-bold dark:text-white">
                {WEEK[getDay(day)]}
              </div>
              <div className="dark:text-gray-300 p-3 text-lg">
                {format(day, "d")}
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}