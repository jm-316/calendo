import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useUser } from "./useUser";
import { CalendarType } from "../interface";
import {
  addEvent,
  deleteCalendar,
  getCalendar,
  getCalendars,
  updateCalendar,
} from "../services/apiCalendar";

export function useCalendars(calendarId?: number) {
  const { user } = useUser();

  const queryClient = useQueryClient();

  const calendarsQuery = useQuery<CalendarType[]>({
    queryKey: ["calendars", user?.id],
    queryFn: () => {
      return getCalendars(user?.id as string);
    },
    enabled: !!user?.id,
  });

  const calendarQuery = useQuery({
    queryKey: ["calendars", calendarId],
    queryFn: () => {
      return getCalendar(calendarId as number);
    },
    enabled: !!calendarId,
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

  const updatedEvent = useMutation({
    mutationFn: (event: {
      id: number;
      title: string;
      startDate: string;
      endDate?: string;
      startTime?: string;
      endTime?: string;
      color: string;
      content: string;
    }) => updateCalendar(event),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["calendars"] });
    },
    onError: (error) => {
      console.error("Update failed:", error);
    },
  });

  const removeEvent = useMutation({
    mutationFn: (id: number) => deleteCalendar(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["calendars"] });
    },
  });

  return {
    calendars: calendarsQuery.data,
    calendar: calendarQuery.data,
    newEvent,
    updatedEvent,
    removeEvent,
  };
}
