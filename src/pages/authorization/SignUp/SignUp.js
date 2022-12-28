import React from "react";
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
import GoogleButton from "react-google-button";
import {
  signInWithGooglePopup,
  createAuthUserWithEmailAndPassword,
  createUserDocumentFromAuth,
} from "../../../FirebaseUtils";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import validationSchema from "./Validations";
import { postRegister } from "../../../Data";
import { UseAuth } from "../../../contexts/AuthContext";

function SignUp() {
  const { login } = UseAuth();
  const navigate = useNavigate();

  const { handleSubmit, handleChange, values, errors, touched } = useFormik({
    initialValues: {
      username: "",
      email: "",
      password: "",
      passwordConfirm: "",
    },
    validationSchema,

    // LOGIN WITH FIREBASE
    onSubmit: async (values, bag) => {
      try {
        const { user } = await createAuthUserWithEmailAndPassword({
          displayName: values.username,
          email: values.email,
          password: values.password,
        });
        console.log("user", user);

        await createUserDocumentFromAuth(user, {
          displayName: values.username,
          email: values.email,
        });
        navigate("/products");
      } catch (error) {
        if (error.code === "auth/email-already-in-use") {
          alert("Cannot create user, email already in use");
        } else {
          console.log("user creation encountered an error", error);
        }
      }
    },

    //LOGIN WITH BACKEND
    // onSubmit:
    //   async (values, bag) => {
    //   try {
    //     const registerResponse = await postRegister({
    //       email: values.email,
    //       password: values.password,
    //     });
    //     login(registerResponse)
    //     console.log(registerResponse);
    //     navigate("/products")
    //   } catch (error) {
    //     bag.setErrors({ general: error.response.data.message });
    //   }
    // },
  });

  const signInWithGoogle = async () => {
    await signInWithGooglePopup();
    navigate("/products");
  };

  return (
    <div>
      <Flex align="center" width="full" justifyContent="center">
        <Box pt={10}>
          <Box textAlign="center">
            <Heading>Sign Up</Heading>
          </Box>
          <Box my={5}>
            {errors.general && (
              <Alert backgroundColor="pink">{errors.general}</Alert>
            )}
          </Box>
          <Box my={5} textAlign="left">
            <form onSubmit={handleSubmit}>
              <FormControl mt="4">
                <FormLabel>User Name</FormLabel>
                <Input
                  name="username"
                  type="string"
                  onChange={handleChange}
                  isInvalid={touched.username && errors.username}
                />
              </FormControl>
              {touched.username && errors.username}

              <FormControl mt="4">
                <FormLabel>Email</FormLabel>
                <Input
                  name="email"
                  type="email"
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

              <FormControl mt="4">
                <FormLabel>Password Confirm</FormLabel>
                <Input
                  name="passwordConfirm"
                  type="password"
                  onChange={handleChange}
                  isInvalid={touched.passwordConfirm && errors.passwordConfirm}
                />
              </FormControl>
              {touched.passwordConfirm && errors.passwordConfirm}

              <Button mt="4" width="full" type="submit">
                Sign Up
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

export default SignUp;
