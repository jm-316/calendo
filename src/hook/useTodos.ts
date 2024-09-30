import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  addTodo,
  deleteTodo,
  getTodos,
  updateTodo,
} from "../services/apiTodos";
import { useUser } from "./useUser";
import { TodoType } from "../interface";

export function useTodos() {
  const queryClient = useQueryClient();
  const { user } = useUser();

  const todosQuery = useQuery<TodoType[]>({
    queryKey: ["todos", user?.id],
    queryFn: () => {
      return getTodos(user?.id as string);
    },
    enabled: !!user?.id,
  });

  const newTodo = useMutation({
    mutationFn: (todo: {
      content: string;
      completed: boolean;
      userId: string;
    }) => addTodo(todo),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
    onError: (error) => {
      console.error("Failed to add todo:", error);
    },
  });

  const updatedTodo = useMutation({
    mutationFn: (todo: { id: number; content: string; completed: boolean }) =>
      updateTodo(todo),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
  });

  const removeTodo = useMutation({
    mutationFn: (id: number) => deleteTodo(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
  });

  return {
    todos: todosQuery.data,
    isLoading: todosQuery.isLoading,
    newTodo,
    updatedTodo,
    removeTodo,
  };
}
