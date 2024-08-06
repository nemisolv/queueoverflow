import { RoleType } from "@/constants";
import { getAuth } from "@/utils/authUtils"
import { Navigate, Outlet,  RouteProps, useLocation } from "react-router-dom";
type PrivateRouteProps = RouteProps & {
    requiredRoles?: string[]; // Add a requiredRoles prop to specify which roles can access the route
}

export default function PrivateRoute({requiredRoles=[RoleType.USER]}: PrivateRouteProps) {
    const location = useLocation(); 

    // logic check if user is authenticated

    const { user } = getAuth();
    

    const isAuthorized = user && requiredRoles.some(role => user.roles.includes(role));
    if (!isAuthorized) {
        return <Navigate
        state={{ from: location }} replace
        
        to="/auth/login" />
    }

    return <Outlet  />
}