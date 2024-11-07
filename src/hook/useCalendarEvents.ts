import { useSelector } from "react-redux";
import {
  addDays,
  differenceInCalendarDays,
  endOfMonth,
  endOfWeek,
  format,
  startOfDay,
  startOfMonth,
  startOfWeek,
} from "date-fns";
import { useCallback, useMemo } from "react";
import { CalendarType } from "../interface";
import { selectCurrentDate } from "../slices/schedulerSlice";

export function useCalendarEvents(calendars: CalendarType[] | undefined) {
  const currentDate = useSelector(selectCurrentDate);
  const monthStart = startOfMonth(currentDate);
  const monthEnd = endOfMonth(currentDate);

  const createMonth = useMemo(() => {
    const monthArray = [];

    let day = startOfWeek(monthStart);
    const lastDay = endOfWeek(monthEnd);

    while (differenceInCalendarDays(lastDay, day) >= 0) {
      monthArray.push(day);
      day = addDays(day, 1);

      if (monthArray.length > 35) break;
    }

    return monthArray;
  }, [monthStart, monthEnd]);

  const findSingleDayEvents = useCallback(
    (day: Date) => {
      return calendars?.filter((calendar: CalendarType) => {
        const eventStartDate = calendar.startDate
          ? format(
              new Date(
                `${calendar.startDate}T${calendar.startTime || "00:00"}`
              ),
              "yyyy-MM-dd"
            )
          : null;

        const eventEndDate = calendar.endDate
          ? format(
              new Date(`${calendar.endDate}T${calendar.endTime || "00:00"}`),
              "yyyy-MM-dd"
            )
          : null;

        const calendarDay = format(day, "yyyy-MM-dd");

        return (
          eventStartDate &&
          calendarDay === eventStartDate &&
          (!eventEndDate || eventStartDate === eventEndDate)
        );
      });
    },
    [calendars]
  );

  const findSingleDayAndHourEvents = useCallback(
    (day: Date, hour: number) => {
      return calendars?.filter((calendar: CalendarType) => {
        const eventStartDate = new Date(
          `${calendar.startDate}T${calendar.startTime || "00:00"}`
        );
        const eventEndDate = calendar.endDate
          ? new Date(`${calendar.endDate}T${calendar.endTime || "00:00"}`)
          : null;

        if (!eventEndDate || eventStartDate.getTime() === day.getTime()) {
          const eventStartHour = eventStartDate.getHours();
          const eventEndHour = eventEndDate
            ? eventEndDate.getHours()
            : eventStartHour + 1;

          return hour >= eventStartHour && hour < eventEndHour;
        }

        return false;
      });
    },
    [calendars]
  );

  const findMultiDayEvents = useCallback(
    (day: Date) => {
      return calendars?.filter((calendar: CalendarType) => {
        const eventStartDate = new Date(
          `${calendar.startDate}T${calendar.startTime || "00:00"}`
        );
        const eventEndDate = calendar.endDate
          ? new Date(`${calendar.endDate}T${calendar.endTime || "00:00"}`)
          : null;

        const eventStartDay = startOfDay(eventStartDate);

        if (
          eventEndDate &&
          eventStartDate.toDateString() === eventEndDate.toDateString()
        ) {
          return false;
        }

        const eventEndDay = eventEndDate ? startOfDay(eventEndDate) : null;

        return (
          eventEndDay &&
          day.getTime() >= eventStartDay.getTime() &&
          day.getTime() <= eventEndDay.getTime()
        );
      });
    },
    [calendars]
  );

  return {
    createMonth,
    findSingleDayEvents,
    findSingleDayAndHourEvents,
    findMultiDayEvents,
  };
}
