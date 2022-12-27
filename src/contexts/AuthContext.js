import { useState, createContext, useEffect, useContext } from "react";
import {
  onAuthStateChangedListener,
  createUserDocumentFromAuth,
} from "../FirebaseUtils";
import { fetchMe, postLogout } from "../Data";
import { Flex, Spinner } from "@chakra-ui/react";
const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState();
  const [isLogin, setIsLogin] = useState(false);
  const [isLoading, setIsLoading]= useState(true);
  const [currentUser, setCurrentUser] = useState(null);

// WATCHING WITH GOOGLE FIREBASE
  
  useEffect(() => {
    const unsubscribe = onAuthStateChangedListener((user) => {
      // Eğer user gelirse bu user yeni mi değil mi diye kontrol edip öyle atamak için createUserDocumentFromAuth'u çalıştırır
      if (user) {
        createUserDocumentFromAuth(user);
      }
      // eğer user yoksa da direk curretn user'ı atar
      setCurrentUser(user);
      console.log(user);
    });
    return unsubscribe;
  }, []);
  console.log("Curren User", currentUser);


  // WATCHING WITH BACKEND
  // useEffect(() => {
    // çağırdığımız fonksiyon async bir fonksiyon. Bu yüzden useEffect içinde bunu async olarak çağırmamız gerekli. bunu da aşağıdaki gibi yapılamadığı için içeride bir anonymus fonksiyon yazıldı.
  //   (async () => {
  //     try {
  //       const me = await fetchMe();
  //       setIsLogin(true);
  //       setUser(me);
  //       setIsLoading(false);
  //     } catch (e) {
  //       setIsLoading(false)
  //     }
  //   })();
  // }, []);
  
  // console.log("me", user);
  // useEffect(async() => {
  //   const me =await fetchMe();
  //   console.log("me", me);
  // }, [])

  // const login = (data) => {
  //   setIsLogin(true);
  //   setUser(data.user);

    // datadan gelen access-token ve refresh-token'ı localstorage'a alıyoruz.
  //   localStorage.setItem("access-token", data.accessToken);
  //   localStorage.setItem("refresh-token", data.refreshToken);
  // };

  // const logout = async () => {
  //   setIsLogin(false);
  //   setUser(null);
    
  //   await postLogout();

  //   localStorage.removeItem('access-token')
  //   localStorage.removeItem('refresh-token')
  // }

  const values = {
    setIsLogin,
    isLogin,
    setUser,
    user,
    // login,
    currentUser,
    setCurrentUser,
    // logout,
  };

  // if(isLoading){
  //   return (
  //     <Flex justifyContent="center" alignItems="center" height="100vh">
  //       <Spinner size="xl"/>
  //     </Flex>
  //   )
  // }

  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>;
};

const UseAuth = () => useContext(AuthContext);
export { AuthProvider, UseAuth };
