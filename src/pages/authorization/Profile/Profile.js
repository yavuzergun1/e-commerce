import { Button, Heading } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import React from "react";
import { UseAuth } from "../../../contexts/AuthContext";
import { postLogout } from "../../../Data";

function Profile() {
  const { user, setIsLogin, isLogin, setUser } = UseAuth();

  // const handleLogout = async() => {
  //   logout()
  // }

  let navigate = useNavigate();
  const logout = async () => {
    setIsLogin(false);
    setUser(null);

    await postLogout();

    localStorage.removeItem("access-token");
    localStorage.removeItem("refresh-token");
    
    navigate("/products")
  };
  return (
    <div>
      <Heading as="h2" size="3xl">
        Profile
      </Heading>
      {JSON.stringify(user)}
      <br />
      <br />
   
        <Button colorScheme="blue" variant="solid" onClick={logout}>
          Logout
        </Button>
  
    </div>
  );
}

export default Profile;