import {
  differenceInBusinessDays,
  differenceInCalendarDays,
  startOfDay,
} from "date-fns";
import { useNavigate } from "react-router";
import { CalendarType } from "../../../interface";

export default function MultiDayEvent({
  events,
  day,
}: {
  events: CalendarType[];
  day: Date;
}) {
  const navigate = useNavigate();
  return (
    <>
      {events
        .sort((a, b) => {
          const aDuration = differenceInBusinessDays(
            new Date(a.endDate || a.startDate),
            new Date(a.startDate)
          );
          const bDuration = differenceInCalendarDays(
            new Date(b.endDate || b.startDate),
            new Date(b.startDate)
          );
          return bDuration - aDuration;
        })
        .map((event, eventIndex) => {
          const startDate = startOfDay(new Date(event.startDate));
          const endDate = event.endDate
            ? startOfDay(new Date(event.endDate))
            : startDate;
          const currentDay = startOfDay(day);
          const eventHeight = window.innerHeight >= 1468 ? 12 : 5;
          if (currentDay >= startDate && currentDay <= endDate) {
            return (
              <div
                key={event.id}
                className={`relative text-left w-full h-2 lg:h-[22px] lg:pl-2`}
                style={{
                  backgroundColor: event.color,
                  top: `${eventIndex * eventHeight}px`,
                }}
                onClick={(e) => {
                  e.stopPropagation();
                  navigate(
                    event.id ? `/calendars/${event.id}` : `/calendars/new`
                  );
                }}>
                {currentDay.getTime() === startDate.getTime() && (
                  <span className="hidden lg:block lg:text-sm ">
                    {event.title}
                  </span>
                )}
              </div>
            );
          }
          return null;
        })}
    </>
  );
}
