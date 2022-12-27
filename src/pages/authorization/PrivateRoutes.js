import { Navigate } from "react-router-dom";
import { UseAuth } from "../../contexts/AuthContext";

// PRIVATEROUTE WITH FIREBASE
export const LoginPrivateRoutes = ({ children }) => {
  const { currentUser } = UseAuth();
  return currentUser !== null ? children : <Navigate to="/signup" />;
};

// PRIVATEROUTE WITH BACKEND
// export const LoginPrivateRoutes = ({ children }) => {
//   const { isLogin } = UseAuth();
//   return isLogin == true ? children : <Navigate to="/signup" />;
// };

export const AdminPrivateRoutes = ({ children }) => {
  const { user } = UseAuth();
  return user && user.role === "admin" ? children : <Navigate to="/e-commerce" />;
};

