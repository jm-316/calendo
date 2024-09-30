import { useQuery } from "@tanstack/react-query";
import { useUser } from "./useUser";
import { CalendarType } from "../interface";
import { getCalendars } from "../services/apiCalendar";

export function useCalendars() {
  const { user } = useUser();

  const calendarsQuery = useQuery<CalendarType[]>({
    queryKey: ["calendars", user?.id],
    queryFn: () => {
      return getCalendars(user?.id as string);
    },
  });

  return { calendars: calendarsQuery.data };
}
