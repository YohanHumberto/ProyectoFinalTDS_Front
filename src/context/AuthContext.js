import React, { createContext, useState } from 'react';
import useAuth from '../hooks/useAuth';

const AuthDataContext = createContext();

function AuthContext({ children }) {

    const [loading, setLoading] = useState(false);
    const { loginElector, loginAdmin, Logout,LogoutElector } = useAuth();

    const data = {
        loginElector,
        loginAdmin,
        Logout,
        LogoutElector
    };

    return <AuthDataContext.Provider value={data}>{children}</AuthDataContext.Provider>;
}

export { AuthDataContext };
export default AuthContext;