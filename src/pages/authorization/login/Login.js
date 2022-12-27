import React from "react";
import {
  signInWithGooglePopup,
  signInAuthUserWithEmailAndPassword,
} from "../../../FirebaseUtils";

import {
  Flex,
  Box,
  Heading,
  FormControl,
  FormLabel,
  Input,
  Button,
  Alert,
} from "@chakra-ui/react";
import { message } from "antd";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import validationSchema from "./Validations";
import { postLogin } from "../../../Data";
import { UseAuth } from "../../../contexts/AuthContext";
import GoogleButton from "react-google-button";

function Login() {
  // const { login } = UseAuth(); /* LOGIN WITH BACKEND */
  const navigate = useNavigate();

  const signInWithGoogle = async () => {
    await signInWithGooglePopup();
  };

  const { handleSubmit, handleChange, values, errors, touched } = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema,
    onSubmit: async (values, bag) => {

    try {
      await signInAuthUserWithEmailAndPassword(values.email, values.password);
    } catch (error) {
      switch (error.code) {
        case "auth/wrong-password":
          message.error("Invalid Password");
          break;
        case "auth/user-not-found":
          message.error("Invalid email");
          break;

        default:
          console.log(error);
      }
    }
      
      // LOGIN WITH BACKEND
      // try {
      //   const loginResponse = await postLogin({
      //     email: values.email,
      //     password: values.password,
      //   });
      //   login(loginResponse);
      //   console.log(loginResponse);
      //   navigate("/products");
      // } catch (error) {
      //   bag.setErrors({ general: error.response.data.message });
      // }
    },
  });
  return (
    <div>
      <Flex align="center" width="full" justifyContent="center">
        <Box pt={10}>
          <Box textAlign="center">
            <Heading>Login</Heading>
          </Box>
          <Box my={5}>
            {errors.general && (
              <Alert backgroundColor="pink">{errors.general}</Alert>
            )}
          </Box>
          <Box my={5} textAlign="center">
            <form onSubmit={handleSubmit}>
              <FormControl>
                <FormLabel>E-mail</FormLabel>
                <Input
                  name="email"
                  onChange={handleChange}
                  isInvalid={
                    touched.email && errors.email
                  } /* touched yazılmazsa forma tıklandığı anda hata verir */
                />
              </FormControl>
              {touched.email && errors.email}

              <FormControl mt="4">
                <FormLabel>Password</FormLabel>
                <Input
                  name="password"
                  type="password"
                  onChange={handleChange}
                  isInvalid={touched.password && errors.password}
                />
              </FormControl>
              {touched.password && errors.password}

              <Button mt="4" width="full" type="submit">
                Login
              </Button>

              <GoogleButton
                style={{ marginTop: "25px" }}
                onClick={signInWithGoogle}
              />
            </form>
          </Box>
        </Box>
      </Flex>
    </div>
  );
}

export default Login;
