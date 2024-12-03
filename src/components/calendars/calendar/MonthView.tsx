import { format } from "date-fns";
import { useNavigate } from "react-router";
import MultiDayEvent from "./MultiDayEvent";
import SingleDayEvent from "./SingleDayEvent";
import { useCalendars } from "../../../hook/useCalendars";
import { useCalendarEvents } from "../../../hook/useCalendarEvents";
import { WEEK } from "../../../utils/\bconstants";
import { useUser } from "../../../hook/useUser";

export default function MonthView({ isDashboard }: { isDashboard: boolean }) {
  const navigate = useNavigate();
  const { user } = useUser();
  const { calendars } = useCalendars(undefined, user?.id);
  const { createMonth, findSingleDayEvents, findMultiDayEvents } =
    useCalendarEvents(calendars);

  return (
    <div
      className={`grid grid-cols-7 ${
        isDashboard ? "rounded-2xl" : "border-2 rounded-sm"
      }`}>
      {WEEK.map((day) => (
        <div
          key={day}
          className={`flex items-center justify-center ${
            isDashboard
              ? "h-10 md:h-11 lg:h-16 md:mb-5 lg:mb-6"
              : "h-12 font-bold bg-gray-100 border border-gray-300 dark:bg-gray-300 dark:border-gray-400 dark:text-black"
          }`}>
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
            className={`${
              isDashboard
                ? "md:h-16 lg:h-20"
                : "flex flex-col items-start justify-start h-16 border lg:h-32 relative dark:bg-gray-200 dark:border-gray-500 dark:text-black"
            }`}>
            <div
              className={`flex flex-col items-center justify-center w-5 md:w-7 h-5 md:h-7 lg:w-8 lg:h-8 mx-auto py-2 mb-1 ${
                today ? "bg-blue-300 text-white rounded-full" : ""
              }`}>
              <div className="text-xs md:text-sm">{format(day, "d")}</div>
            </div>
            {!isDashboard && (
              <div className="relative w-full h-full">
                <MultiDayEvent events={multiDayEvents ?? []} day={day} />
                <SingleDayEvent
                  events={singleDayEvents ?? []}
                  day={day}
                  multiDayEventsForDay={multiDayEventsForDay ?? []}
                />
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
