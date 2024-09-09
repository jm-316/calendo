import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { User } from "@supabase/supabase-js";
import { useNavigate } from "react-router";
import { getCurrentUser, logout } from "../services/apiAuth";

export function useUser() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const userQuery = useQuery<User | null>({
    queryKey: ["user"],
    queryFn: getCurrentUser,
  });

  const userLogout = useMutation({
    mutationFn: logout,
    onSuccess: () => {
      queryClient.refetchQueries();
      navigate("/login", { replace: true });
    },
  });

  return { user: userQuery.data, logout: userLogout.mutate };
}
