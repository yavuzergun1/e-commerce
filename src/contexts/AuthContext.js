import {useState, createContext, useEffect, useContext} from "react";

const AuthContext= createContext();

const AuthProvider = ({children}) => {
    const [user, setUser] = useState();
    const [isLogin, setIsLogin] = useState(false);

    const login = (data) => {
        setIsLogin(true);
        setUser(data.user)
    };

    const values = {
        isLogin,
        user,
        login,
    }

    return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>
};

const UseAuth = () => useContext(AuthContext);
export {AuthProvider, UseAuth}