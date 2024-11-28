import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { CalendarType } from "../interface";
import {
  addEvent,
  deleteCalendar,
  getCalendar,
  getCalendars,
  searchCalendar,
  updateCalendar,
} from "../services/apiCalendar";

export function useCalendars(calendarId?: number, userId?: string) {
  const queryClient = useQueryClient();

  const calendarsQuery = useQuery<CalendarType[]>({
    queryKey: ["calendars", userId],
    queryFn: () => {
      return getCalendars(userId as string);
    },
    enabled: !!userId,
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

  const searchEvent = useMutation({
    mutationFn: ({
      userId,
      searchQuery,
    }: {
      userId: string;
      searchQuery: string;
    }) => {
      if (!userId) {
        throw new Error("user의 정보가 없습니다.");
      }
      return searchCalendar(userId, searchQuery);
    },
    onError: (error) => {
      console.error("검색 실패", error);
    },
  });

  return {
    calendars: calendarsQuery.data,
    calendar: calendarQuery.data,
    newEvent,
    updatedEvent,
    removeEvent,
    searchEvent,
  };
}
