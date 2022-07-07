import { useState, createContext, useEffect, useContext } from "react";
import { fetchMe } from "../Data";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState();
  const [isLogin, setIsLogin] = useState(false);

  useEffect(() => {
    // çağırdığımız fonksiyon async bir fonksiyon. Bu yüzden useEffect içinde bunu async olarak çağırmamız gerekli. bunu da aşağıdaki gibi yapılamadığı için içeride bir anonymus fonksiyon yazıldı.
    (async () => {
      try {
        const me = await fetchMe();
        console.log("me", me);
        setIsLogin(true);
        setUser(me);

      } catch (e) {}
    })();
  }, []);

  // useEffect(async() => {
  //   const me =await fetchMe();
  //   console.log("me", me);
  // }, [])

  const login = (data) => {
    setIsLogin(true);
    setUser(data.user);

    // datadan gelen access-token ve refresh-token'ı localstorage'a alıyoruz.
    localStorage.setItem("access-token", data.accessToken);
    localStorage.setItem("refresh-token", data.refreshToken);
  };

  const values = {
    isLogin,
    user,
    login,
  };

  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>;
};

const UseAuth = () => useContext(AuthContext);
export { AuthProvider, UseAuth };
