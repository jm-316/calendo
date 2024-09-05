import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  addTodo,
  deleteTodo,
  getTodos,
  updateTodo,
} from "../services/apiTodos";

export interface TodoType {
  id: number;
  content: string;
  completed: boolean;
  date?: Date;
}

export function useTodos() {
  const queryClient = useQueryClient();

  const todosQuery = useQuery<TodoType[]>({
    queryKey: ["todos"],
    queryFn: getTodos,
  });

  const newTodo = useMutation({
    mutationFn: (todo: { content: string; completed: boolean }) =>
      addTodo(todo),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
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
