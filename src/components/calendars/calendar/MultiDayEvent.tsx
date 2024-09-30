import {
  differenceInBusinessDays,
  differenceInCalendarDays,
  startOfDay,
} from "date-fns";
import { CalendarType } from "../../../interface";

export default function MultiDayEvent({
  events,
  day,
}: {
  events: CalendarType[];
  day: Date;
}) {
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
                key={eventIndex}
                className={`absolute text-left w-full`}
                style={{
                  backgroundColor: event.color,
                  top: `${eventIndex * 20}px`,
                  height: "20px",
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
