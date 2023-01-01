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
  const { currentUser } = UseAuth();
  return currentUser && currentUser.uid === "9ddpEVIpP9fMqsRluRCOxvyIGrG2" ? (
    children
  ) : (
    <Navigate to="/e-commerce" />
  );
};

