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

export const updateCalendar = async ({
  id,
  title,
  startDate,
  endDate,
  startTime,
  endTime,
  color,
  content,
}: {
  id: number;
  title: string;
  startDate: string;
  endDate?: string;
  startTime?: string;
  endTime?: string;
  color: string;
  content: string;
}): Promise<NewCalendarType[]> => {
  try {
    const formattedStartTime = startTime || null;
    const formattedEndDate = endDate || null;
    const formattedEndTime = endTime || null;
    const { data, error } = await supabase
      .from("calendars")
      .update({
        title,
        startDate,
        startTime: formattedStartTime,
        endDate: formattedEndDate,
        endTime: formattedEndTime,
        color,
        content,
      })
      .eq("id", id)
      .select();

    if (error) {
      console.error(error);
      throw new Error("Calendar를 업데이트할 수 없습니다.");
    }

    return data as NewCalendarType[];
  } catch (error) {
    console.log(error);
    return [];
  }
};

export const deleteCalendar = async (id: number): Promise<void> => {
  try {
    const { error } = await supabase.from("calendars").delete().eq("id", id);

    if (error) {
      console.error(error);
      throw new Error("Calendar를 삭제할 수 없습니다.");
    }
  } catch (error) {
    console.log(error);
  }
};

export const searchCalendar = async (
  userId: string,
  searchQuery: string
): Promise<CalendarType[]> => {
  try {
    const { data, error } = await supabase
      .from("calendars")
      .select("*")
      .eq("userId", userId)
      .like("title", `%${searchQuery}%`);

    if (error) {
      console.error(error);
      throw new Error("검색 중 오류가 발생했습니다.");
    }

    return data;
  } catch (error) {
    console.log(error);
    return [];
  }
};
