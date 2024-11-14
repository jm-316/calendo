import { format } from "date-fns";
import { useNavigate } from "react-router";
import MultiDayEvent from "./MultiDayEvent";
import SingleDayEvent from "./SingleDayEvent";
import { useCalendars } from "../../../hook/useCalendars";
import { useCalendarEvents } from "../../../hook/useCalendarEvents";
import { WEEK } from "../../../utils/\bconstants";

export default function MonthView() {
  const navigate = useNavigate();
  const { calendars } = useCalendars();
  const { createMonth, findSingleDayEvents, findMultiDayEvents } =
    useCalendarEvents(calendars);

  return (
    <div className="grid grid-cols-7 border-2 rounded-sm">
      {WEEK.map((day) => (
        <div
          key={day}
          className="flex items-center justify-center h-12 font-bold bg-gray-100 border border-gray-300 dark:bg-gray-300 dark:border-gray-400 dark:text-black">
          {day}
        </div>
      ))}
      {createMonth.map((day, i) => {
        const today =
          format(new Date(), "yyyyMMdd") === format(day, "yyyyMMdd");

        const multiDayEvents = findMultiDayEvents(day);
        const singleDayEvents = findSingleDayEvents(day);

        const multiDayEventsForDay = multiDayEvents?.filter((event) => {
          const startDate = format(new Date(event.startDate), "yyyy-MM-dd");
          const endDate = event.endDate
            ? format(new Date(event.endDate), "yyyy-MM-dd")
            : startDate;
          const calendarDay = format(day, "yyyy-MM-dd");

          return calendarDay >= startDate && calendarDay <= endDate;
        });

        const handleClick = () => {
          if (!singleDayEvents?.length || !multiDayEvents?.length) {
            navigate("/calendars/new");
          }
        };

        return (
          <div
            key={`date${i}`}
            onClick={handleClick}
            className={`flex flex-col items-start justify-start h-16 border lg:h-32 relative dark:bg-gray-200 dark:border-gray-500 dark:text-black`}>
            <div
              className={`flex flex-col items-center justify-center w-8 h-8 mx-auto py-2 ${
                today ? "bg-blue-300 text-white rounded-full" : ""
              }`}>
              <div>{format(day, "d")}</div>
            </div>
            <div className="relative w-full h-full">
              <MultiDayEvent events={multiDayEvents ?? []} day={day} />
              <SingleDayEvent
                events={singleDayEvents ?? []}
                day={day}
                multiDayEventsForDay={multiDayEventsForDay ?? []}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}
