import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";

export const ProtectedRoute = ({ onlyUnAuth = false, children }) => {
  const { user, isAuthChecked } = useSelector((state) => state.user);
  const location = useLocation();

  if (onlyUnAuth && user) {
    const { from } = location.state || { from: { pathname: "/" } };
    return <Navigate to={from} />;
  }

  if (!onlyUnAuth && !user) {
    return <Navigate to="/login/" state={{ from: location }} />;
  }

  return children;
};
