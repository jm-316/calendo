import { format } from "date-fns";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { useCalendars } from "../../../hook/useCalendars";
import { selectCurrentDate } from "../../../slices/schedulerSlice";
import { useCalendarEvents } from "../../../hook/useCalendarEvents";

export default function EventColumn() {
  const currentDate = useSelector(selectCurrentDate);
  const { calendars } = useCalendars();
  const navigate = useNavigate();

  const {
    createMonth,
    findSingleDayEvents,
    findSingleDayAndHourEvents,
    findMultiDayEvents,
  } = useCalendarEvents(calendars);

  return (
    <div className="flex w-full min-w-fit">
      {createMonth
        .filter(
          (day) =>
            format(day, "yyyy-MM-dd") === format(currentDate, "yyyy-MM-dd")
        )
        .map((day, index) => (
          <div className="flex flex-col w-full relative" key={index}>
            {new Array(25).fill(null).map((_, hour) => {
              const events = findSingleDayAndHourEvents(day, hour);
              const singleDayEvents = findSingleDayEvents(day);
              const multiDayEvents = findMultiDayEvents(day);

              return (
                <div
                  onClick={() => {
                    navigate("/calendars/new");
                  }}
                  className={`flex gap-6 items-center h-14 border-l-2 ${
                    hour === 24 ? "" : "border-b-2"
                  }`}
                  key={hour}>
                  <div className="w-full text-center">
                    {multiDayEvents && multiDayEvents.length > 0 && hour === 0
                      ? multiDayEvents.map((event, eventIndex) => {
                          const startDate = format(
                            new Date(event.startDate),
                            "yyyy-MM-dd"
                          );
                          const endDate = event.endDate
                            ? format(new Date(event.endDate), "yyyy-MM-dd")
                            : startDate;
                          const currentDay = format(day, "yyyy-MM-dd");

                          if (
                            currentDay >= startDate &&
                            currentDay <= endDate
                          ) {
                            return (
                              <div
                                key={eventIndex}
                                className={`h-full w-full text-center ${
                                  eventIndex !== multiDayEvents.length - 1
                                    ? "border-b-2"
                                    : ""
                                }`}
                                style={{ backgroundColor: event.color }}
                                onClick={(e) => {
                                  e.stopPropagation();
                                  navigate(
                                    event.id
                                      ? `/calendars/${event.id}`
                                      : `/calendars/new`
                                  );
                                }}>
                                {event.title}
                              </div>
                            );
                          }
                        })
                      : ""}
                    {hour === 0 && singleDayEvents && singleDayEvents.length > 0
                      ? singleDayEvents
                          .filter((event) => !event.startTime)
                          .map((event) => (
                            <div
                              key={event.id}
                              className="h-full w-full text-center border-b-2"
                              style={{ backgroundColor: event.color }}
                              onClick={(e) => {
                                e.stopPropagation();
                                navigate(
                                  event.id
                                    ? `/calendars/${event.id}`
                                    : `/calendars/new`
                                );
                              }}>
                              {event.title}
                            </div>
                          ))
                      : ""}
                    {events && events.length > 0
                      ? events.map((event) => {
                          const eventStartDateTime = new Date(
                            `${event.startDate}T${event.startTime}`
                          );
                          const eventEndDateTime = event.endDate
                            ? new Date(`${event.endDate}T${event.endTime}`)
                            : new Date(
                                `${event.startDate}T${
                                  event.endTime || event.startTime
                                }`
                              );

                          const eventStartHour = eventStartDateTime.getHours();
                          const eventEndHour = eventEndDateTime.getHours();

                          if (format(day, "yyyy-MM-dd") === event.startDate) {
                            if (hour >= eventStartHour && hour < eventEndHour) {
                              const durationInHours =
                                eventEndHour - eventStartHour;
                              const topPosition = eventStartHour * 60 - 20;
                              const height = durationInHours * 60 - 10;

                              return (
                                <div
                                  key={event.id}
                                  className={`absolute left-0 right-0 flex items-center justify-center`}
                                  style={{
                                    top: `${topPosition}px`,
                                    height: `${height}px`,
                                    backgroundColor: event.color,
                                  }}
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    navigate(
                                      event.id
                                        ? `/calendars/${event.id}`
                                        : `/calendars/new`
                                    );
                                  }}>
                                  {hour === eventStartHour ? (
                                    event.title
                                  ) : (
                                    <div>&nbsp;</div>
                                  )}
                                </div>
                              );
                            }
                          }

                          return <div key={event.id}>&nbsp;</div>;
                        })
                      : ""}
                  </div>
                </div>
              );
            })}
          </div>
        ))}
    </div>
  );
}
