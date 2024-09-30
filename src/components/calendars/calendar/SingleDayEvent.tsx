import { format } from "date-fns";
import { CalendarType } from "../../../interface";

export default function SingleDayEvent({
  events,
  day,
  multiDayEventsForDay,
}: {
  events: CalendarType[];
  day: Date;
  multiDayEventsForDay: CalendarType[];
}) {
  return (
    <>
      {events.map((event, eventIndex) => {
        const eventDate = format(new Date(event.startDate), "yyyy-MM-dd");
        const calendarDay = format(day, "yyyy-MM-dd");
        if (calendarDay === eventDate) {
          const singleEventTop =
            multiDayEventsForDay && multiDayEventsForDay.length > 0
              ? multiDayEventsForDay.length * 20 + 30
              : 0;

          return (
            <div
              key={eventIndex}
              className="absolute w-full text-left"
              style={{
                backgroundColor: event.color,
                top: `${singleEventTop}px`,
                height: "20px",
              }}>
              {event.title}
            </div>
          );
        }
        return null;
      })}
    </>
  );
}
