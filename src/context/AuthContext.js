import React, { createContext, useState } from 'react';
import useAuth from '../hooks/useAuth';

const AuthDataContext = createContext();

function AuthContext({ children }) {

    const [loading, setLoading] = useState(false);
    const { loginElector, loginAdmin, Logout, LogoutElector, seccionIsValid, userIsAdmin } = useAuth();

    const data = {
        loginElector,
        loginAdmin,
        Logout,
        LogoutElector,
        seccionIsValid,
        userIsAdmin
    };

    return <AuthDataContext.Provider value={data}>{children}</AuthDataContext.Provider>;
}

export { AuthDataContext };
export default AuthContext;