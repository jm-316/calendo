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
      {events.map((event, index) => {
        const eventDate = format(new Date(event.startDate), "yyyy-MM-dd");
        const calendarDay = format(day, "yyyy-MM-dd");
        console.log(window.innerHeight);
        if (calendarDay === eventDate) {
          const eventHeight = window.innerHeight >= 1468 ? 9 : 2;
          const singleEventTop =
            multiDayEventsForDay && multiDayEventsForDay.length > 0
              ? multiDayEventsForDay.length * 2 +
                eventHeight +
                index * eventHeight
              : index * eventHeight;
          return (
            <div
              key={event.id}
              className="relative h-2 lg:h-[22px] lg:w-full lg:pl-2"
              style={{
                backgroundColor: event.color,
                top: `${singleEventTop}px`,
              }}
              onClick={(e) => {
                e.stopPropagation();
                navigate(
                  event.id ? `/calendars/${event.id}` : `/calendars/new`
                );
              }}>
              <div className="hidden lg:block h-1 md:text-sm">
                {event.title}
              </div>
            </div>
          );
        }
        return null;
      })}
    </>
  );
}
