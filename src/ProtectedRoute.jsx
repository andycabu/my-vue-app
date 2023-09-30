import { useApp } from "./context/AppContext";
import { Navigate, Outlet } from "react-router-dom";

function ProtectedRoute() {
  const { isAuthenticated, loading } = useApp();

  if (loading) return <h1>Cargando...</h1>;

  if (!loading && !isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  return <Outlet />;
}
export default ProtectedRoute;
