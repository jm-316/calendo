import { format } from "date-fns";
import { useNavigate } from "react-router";
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
  const navigate = useNavigate();
  return (
    <>
      {events.map((event) => {
        const eventDate = format(new Date(event.startDate), "yyyy-MM-dd");
        const calendarDay = format(day, "yyyy-MM-dd");
        if (calendarDay === eventDate) {
          const singleEventTop =
            multiDayEventsForDay && multiDayEventsForDay.length > 0
              ? multiDayEventsForDay.length * 20 + 10
              : 0;

          return (
            <div
              key={event.id}
              className="absolute w-full text-left text-sm"
              style={{
                backgroundColor: event.color,
                top: `${singleEventTop}px`,
                height: "22px",
              }}
              onClick={(e) => {
                e.stopPropagation();
                navigate(
                  event.id ? `/calendars/${event.id}` : `/calendars/new`
                );
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
