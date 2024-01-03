import { Navigate, useLocation } from "react-router-dom";
import Preloader from "../Preloader/Preloader";

import { TProtectedRouteProps } from "../../services/utils/data";
import { useAppSelector } from "../../services/utils/hooks";
import { useAuth } from "../../services/utils/auth";

export const ProtectedRoute = ({
    onlyUnAuth = false,
    children,
}: TProtectedRouteProps) => {
    const { user, isAuthChecked } = useAuth();
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
