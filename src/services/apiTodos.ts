import { TodoType } from "../hook/useTodos";
import { supabase } from "../utils/SupabaseClient";

export const getTodos = async (): Promise<TodoType[]> => {
  try {
    const { data, error } = await supabase
      .from("todos")
      .select("*")
      .order("id", { ascending: false });

    if (error) {
      console.error(error);
      throw new Error("To-do list를 찾을 수가 없습니다.");
    }

    return data as TodoType[];
  } catch (error) {
    console.log(error);
    return [];
  }
};

export const addTodo = async ({
  content,
  completed,
}: {
  content: string;
  completed: boolean;
}): Promise<TodoType[]> => {
  try {
    const { data, error } = await supabase
      .from("todos")
      .insert([
        {
          content,
          completed,
          date: new Date(),
        },
      ])
      .select();

    if (error) {
      console.error(error);
      throw new Error("To-do를 추가할 수 없습니다.");
    }

    return data as TodoType[];
  } catch (error) {
    console.log(error);
    return [];
  }
};

export const updateTodo = async ({
  id,
  content,
  completed,
}: {
  id: number;
  content: string;
  completed?: boolean;
}): Promise<TodoType[]> => {
  try {
    const { data, error } = await supabase
      .from("todos")
      .update({ content, completed })
      .eq("id", id)
      .select();

    if (error) {
      console.error(error);
      throw new Error("To-do를 업데이트할 수 없습니다.");
    }

    return data as TodoType[];
  } catch (error) {
    console.log(error);
    return [];
  }
};

export const deleteTodo = async (id: number): Promise<void> => {
  try {
    const { error } = await supabase.from("todos").delete().eq("id", id);

    if (error) {
      console.error(error);
      throw new Error("To-do를 삭제할 수 없습니다.");
    }
  } catch (error) {
    console.log(error);
  }
};
