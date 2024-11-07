import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useUser } from "./useUser";
import { CalendarType } from "../interface";
import { addEvent, getCalendars } from "../services/apiCalendar";

export function useCalendars() {
  const { user } = useUser();

  const queryClient = useQueryClient();

  const calendarsQuery = useQuery<CalendarType[]>({
    queryKey: ["calendars", user?.id],
    queryFn: () => {
      return getCalendars(user?.id as string);
    },
  });

  const newEvent = useMutation({
    mutationFn: (event: {
      title: string;
      startDate: string;
      startTime?: string;
      endDate?: string;
      endTime?: string;
      content: string;
      color: string;
      userId: string;
    }) => addEvent(event),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["calendars"] });
    },
    onError: (error) => {
      console.error("Failed to add calendars:", error);
    },
  });

  return { calendars: calendarsQuery.data, newEvent };
}
