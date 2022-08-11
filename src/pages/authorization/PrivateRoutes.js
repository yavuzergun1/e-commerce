import { Navigate } from "react-router-dom";
import { UseAuth } from "../../contexts/AuthContext";

export const LoginPrivateRoutes = ({ children }) => {
  const { isLogin } = UseAuth();
  return isLogin == true ? children : <Navigate to="/signup" />;
};

export const AdminPrivateRoutes = ({ children }) => {
  const { user } = UseAuth();
  return user && user.role === "admin" ? children : <Navigate to="/e-commerce" />;
};
