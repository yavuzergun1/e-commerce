import { Button, Heading } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import React from "react";
import { signOutUser } from "../../../FirebaseUtils";
import { UseAuth } from "../../../contexts/AuthContext";
import { postLogout } from "../../../Data";
import { UseBasket } from "../../../contexts/BasketContext";
import { auth } from "../../../FirebaseUtils";


  function Profile() {
  const { user, currentUser, setIsLogin, isLogin, setUser } = UseAuth();
  const { setItems } = UseBasket();

const curUser = auth.currentUser;
if (curUser !== null) {
  const display = curUser.displayName;
  console.log(display);
}
  let navigate = useNavigate();

  // LOGOUT WITH FIREBASE
  const Logout = async () => {
    signOutUser();
    navigate("/products");
  };
console.log(currentUser);
  // LOGOUT WITH BACKEND
  // const logout = async () => {
  //   setIsLogin(false);
  //   setUser(null);

  //   await postLogout();

  //   localStorage.removeItem("access-token");
  //   localStorage.removeItem("refresh-token");

  //   navigate("/products");
  //   setItems([])
  // };
  return (
    <div>
      <Heading as="h2" size="3xl">
        Profile
      </Heading>
      {JSON.stringify(user)}
      <br />
      <br />

      <Button colorScheme="blue" variant="solid" onClick={Logout}>
        Logout
      </Button>
    </div>
  );
}

export default Profile;
