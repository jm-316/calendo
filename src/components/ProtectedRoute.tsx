import { Navigate } from "react-router";
import { ReactNode } from "react";
import Loading from "./Loading";
import { useUser } from "../hook/useUser";

export default function ProtectedRoute({ children }: { children: ReactNode }) {
  const { user, isLoading } = useUser();

  if (isLoading) {
    return <Loading />;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }
  return children;
}
