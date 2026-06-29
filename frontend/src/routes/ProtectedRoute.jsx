import { Navigate } from "react-router";
import { useAuthStore } from "../store/auth.store";

export default function ProtectedRoute({ children }) {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  return isAuthenticated ? children : <Navigate to="/login" />;
}

/*
If we write:
<ProtectedRoute>
    <LoginPage />
</ProtectedRoute>

then children is <LoginPage />
*/