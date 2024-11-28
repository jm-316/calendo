import { addDays, format, startOfWeek } from "date-fns";
import { useSelector } from "react-redux";
import { selectCurrentDate } from "../../slices/schedulerSlice";
import { useCalendars } from "../../hook/useCalendars";
import { useCalendarEvents } from "../../hook/useCalendarEvents";
import { useUser } from "../../hook/useUser";
import { CalendarType } from "../../interface";

export default function WeeklyEvents() {
  const currentDate = useSelector(selectCurrentDate);
  const { user } = useUser();
  const { calendars } = useCalendars(undefined, user?.id);
  const { findMultiDayEvents, findSingleDayEvents } =
    useCalendarEvents(calendars);

  const weekStart = startOfWeek(currentDate);

  const weekDates = Array.from({ length: 7 }, (_, i) => addDays(weekStart, i));
  const weeklyEvents = weekDates.map((day) => {
    const singleDayEvents = findSingleDayEvents(day) || [];
    const multiDayEvents = findMultiDayEvents(day) || [];
    const allEvents = [...singleDayEvents, ...multiDayEvents];

    return {
      date: format(day, "yyyy-MM-dd"),
      events: allEvents,
    };
  });
  const hasEvents = weeklyEvents.some(({ events }) => events.length > 0);

  return (
    <div>
      {hasEvents ? (
        <ul>
          {weeklyEvents.map(
            ({ date, events }: { date: string; events: CalendarType[] }) => (
              <li key={date} className="md:mb-2 lg:mb-4">
                {events.length > 0 ? (
                  <ul className="p-3">
                    <h3 className="text-sm md:text-lg font-semibold text-gray-500 dark:text-gray-300">
                      {date}
                    </h3>
                    {events.map((event: CalendarType) => (
                      <li
                        key={event.id}
                        className="p-2 my-1 rounded-md flex border-2 h-12 md:h-14 lg:h-24 dark:border-gray-400">
                        <div
                          className="w-2 h-8 md:h-full rounded-sm mr-4"
                          style={{ backgroundColor: event.color }}
                        />
                        <div
                          className={`flex ${
                            event?.startTime
                              ? "flex-col justify-center"
                              : "flex-row items-center"
                          }`}>
                          <div className="md:text-lg lg:text-xl dark:text-white">
                            {event.title}
                          </div>
                          <span className="text-gray-400 text-xs lg:text-lg">
                            {event?.startTime &&
                              format(
                                `${event.startDate}T${event.startTime}`,
                                "h:mm a"
                              )}
                          </span>
                        </div>
                      </li>
                    ))}
                  </ul>
                ) : (
                  ""
                )}
              </li>
            )
          )}
        </ul>
      ) : (
        <div className="w-56 h-24 flex flex-col items-center justify-center mt-10 border-2 mx-auto rounded-xl dark:text-white">
          <span>일정이 없습니다.</span>
          <span>일정을 추가해주세요.</span>
        </div>
      )}
    </div>
  );
}
