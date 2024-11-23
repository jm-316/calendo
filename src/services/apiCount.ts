import { format, startOfMonth } from "date-fns";
import { supabase } from "../utils/SupabaseClient";
import { deleteTodo } from "./apiTodos";
import { CountType } from "../interface";

export const getCount = async (userId: string): Promise<CountType | null> => {
  try {
    const finishMonth = format(startOfMonth(new Date()), "yyyy-MM-01");

    const { data: count, error } = await supabase
      .from("count")
      .select("*")
      .eq("userId", userId)
      .eq("finishMonth", finishMonth)
      .single();

    if (error) {
      console.error(error);
      throw new Error("Count를 조회할 수 없습니다.");
    }

    return count;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const completeTodo = async (
  id: number,
  userId: string
): Promise<void> => {
  try {
    const { data, error } = await supabase
      .from("todos")
      .select("*")
      .eq("id", id)
      .single();

    if (error || !data) {
      console.error(error);
      throw new Error("Todo를 찾을 수가 없습니다.");
    }

    const finishMonth = format(startOfMonth(new Date()), "yyyy-MM-01");

    const count = await getCount(userId);

    if (count) {
      const { error: updateCountError } = await supabase
        .from("count")
        .update({ count: count.count + 1 })
        .eq("userId", userId)
        .eq("finishMonth", finishMonth);

      if (updateCountError) {
        throw new Error("Count 업데이트를 실패했습니다.");
      }
    } else {
      const { error: insertCountError } = await supabase
        .from("count")
        .insert([{ userId, finishMonth, count: 1 }]);

      if (insertCountError) {
        throw new Error("Count 추가를 실패했습니다.");
      }
    }

    await deleteTodo(id);
  } catch (error) {
    console.log(error);
  }
};
