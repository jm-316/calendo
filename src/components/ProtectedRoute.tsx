import { Navigate } from "react-router";
import { ReactNode } from "react";
import { useUser } from "../hook/useUser";

export default function ProtectedRoute({ children }: { children: ReactNode }) {
  const { user } = useUser();

  if (!user) {
    return <Navigate to="/login" replace />;
  }
  return children;
}
