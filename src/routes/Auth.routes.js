import React from "react";
import { Route } from "react-router-dom";
import LoginAdmin from "../views/Auth/LoginAdmin";
import Login from "../views/Auth/Login";
import { AuthGuardLogin } from "./AuthGuard.routes";

const AuthRoutes = () => {
    return (
        <Route>
            <Route path="loginadmin" element={<AuthGuardLogin element={<LoginAdmin />} />} />
            <Route path="login" element={<AuthGuardLogin element={<Login />} />} />
            <Route path="*" element={<AuthGuardLogin element={<Login />} />} />
        </Route>
    );
};

export default AuthRoutes;
