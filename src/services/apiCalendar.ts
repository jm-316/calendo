import { CalendarType, NewCalendarType } from "../interface";
import { supabase } from "../utils/SupabaseClient";

export const getCalendars = async (userId: string): Promise<CalendarType[]> => {
  try {
    const { data: calendars, error } = await supabase
      .from("calendars")
      .select("*")
      .eq("userId", userId);

    if (error) {
      console.error(error);
      throw new Error("Calendar를 찾을 수 없습니다.");
    }

    return calendars;
  } catch (error) {
    console.log(error);
    return [];
  }
};

export const getCalendar = async (id: number): Promise<CalendarType[]> => {
  try {
    const { data: calendar, error } = await supabase
      .from("calendars")
      .select("*")
      .eq("id", id);

    if (error) {
      console.error(error);
      throw new Error("Calendar를 찾을 수 없습니다.");
    }

    return calendar;
  } catch (error) {
    console.log(error);
    return [];
  }
};

export const addEvent = async ({
  title,
  startDate,
  startTime,
  endDate,
  endTime,
  content,
  color,
  userId,
}: {
  title: string;
  startDate: string;
  startTime?: string;
  endDate?: string;
  endTime?: string;
  content: string;
  color: string;
  userId: string;
}): Promise<NewCalendarType[]> => {
  try {
    const formattedStartTime = startTime || null;
    const formattedEndDate = endDate || null;
    const formattedEndTime = endTime || null;

    const { data, error } = await supabase
      .from("calendars")
      .insert([
        {
          title,
          startDate,
          startTime: formattedStartTime,
          endDate: formattedEndDate,
          endTime: formattedEndTime,
          content,
          color,
          userId,
        },
      ])
      .select();

    if (error) {
      console.error(error);
      throw new Error("Event를 추가할 수 없습니다.");
    }

    return data as NewCalendarType[];
  } catch (error) {
    console.log(error);
    return [];
  }
};
