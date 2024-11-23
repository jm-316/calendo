import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { completeTodo, getCount } from "../services/apiCount";
import { CountType } from "../interface";
import { useUser } from "./useUser";

export function useCount() {
  const queryClient = useQueryClient();
  const { user } = useUser();

  const countQuery = useQuery<CountType | null>({
    queryKey: ["count"],
    queryFn: () => {
      return getCount(user?.id as string);
    },
    enabled: !!user?.id,
  });

  const updateCount = useMutation({
    mutationFn: (id: number) => completeTodo(id, user?.id as string),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["count"] });
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
    onError: (error) => {
      console.error("Failed to update count:", error);
    },
  });

  return {
    count: countQuery.data,
    isLoading: countQuery.isLoading,
    updateCount,
  };
}
