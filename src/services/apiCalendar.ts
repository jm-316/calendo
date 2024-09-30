import { CalendarType } from "../interface";
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
