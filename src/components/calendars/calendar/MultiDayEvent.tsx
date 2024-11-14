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

          if (currentDay >= startDate && currentDay <= endDate) {
            return (
              <div
                key={event.id}
                className={`absolute text-left w-full text-sm`}
                style={{
                  backgroundColor: event.color,
                  top: `${eventIndex * 30}px`,
                  height: "22px",
                }}
                onClick={(e) => {
                  e.stopPropagation();
                  navigate(
                    event.id ? `/calendars/${event.id}` : `/calendars/new`
                  );
                }}>
                {currentDay.getTime() === startDate.getTime() && event.title}
              </div>
            );
          }
          return null;
        })}
    </>
  );
}
