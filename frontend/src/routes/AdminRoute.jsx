import { Navigate } from "react-router";
import { useAuthStore } from "../stores/auth.store";

export default function AdminRoute({ children }) {
  const user = useAuthStore((state) => state.user);

  if (!user || user.role !== "admin") {
    return <Navigate to="/" />;
  }

  return children;
}
