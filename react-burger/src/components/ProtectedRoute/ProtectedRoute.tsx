import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";
import Preloader from "../Preloader/Preloader";
import { RootState } from "../../services/types";

export const ProtectedRoute = ({ onlyUnAuth = false, children }: any) => {
  const { user, isAuthChecked } = useSelector((state: RootState) => state.user);
  const location = useLocation();

  if (!isAuthChecked) {
    return <Preloader />;
  }

  if (onlyUnAuth && user) {
    const { from } = location.state || { from: { pathname: "/" } };
    return <Navigate to={from} />;
  }

  if (!onlyUnAuth && !user) {
    return <Navigate to="/login/" state={{ from: location }} />;
  }

  return children;
};
