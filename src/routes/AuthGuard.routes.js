import { useContext, useEffect } from "react";
import { AuthDataContext } from "../context/AuthContext";
import { Navigate, useLocation, useNavigate } from "react-router-dom";

const AuthGuardAdmin = ({ element }) => {

    const location = useLocation();
    const navigate = useNavigate();

    const { seccionIsValid, userIsAdmin } = useContext(AuthDataContext);
    const auth = seccionIsValid() && userIsAdmin();

    useEffect(() => {
        if (!auth) navigate("/loginadmin");
    }, [navigate]);

    return auth ? element : <Navigate to="/loginadmin" />;
}


const AuthGuardElector = ({ element }) => {

    const location = useLocation();
    const navigate = useNavigate();

    const { seccionIsValid, userIsAdmin } = useContext(AuthDataContext);
    const auth = seccionIsValid() && !userIsAdmin();

    useEffect(() => {
        if (!auth) navigate("/login");
    }, [navigate]);

    return auth ? element : <Navigate to="/login" />;
}

const AuthGuardLogin = ({ element }) => {

    const location = useLocation();
    const navigate = useNavigate();

    const { seccionIsValid, userIsAdmin } = useContext(AuthDataContext);
    const authAdmin = seccionIsValid() && userIsAdmin();
    const authElector = seccionIsValid() && !userIsAdmin();

    const routeRedirect = authAdmin ? "/admin/index" : authElector ? "/votacion/votaciones" : "";

    useEffect(() => {
        if (authAdmin || authElector)
            navigate(routeRedirect);
    }, [navigate]);

    return !authAdmin && !authElector ? element : <Navigate to={routeRedirect} />;
}

export { AuthGuardAdmin, AuthGuardElector, AuthGuardLogin };