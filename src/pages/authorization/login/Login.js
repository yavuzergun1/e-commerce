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
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import validationSchema from "./Validations";
import { postLogin } from "../../../Data";
import { UseAuth } from "../../../contexts/AuthContext";

function Login() {
  const { login } = UseAuth();
  const navigate = useNavigate();

  const { handleSubmit, handleChange, values, errors, touched } = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema,
    onSubmit: async (values, bag) => {
      try {
        const loginResponse = await postLogin({
          email: values.email,
          password: values.password,
        });
        login(loginResponse);
        console.log(loginResponse);
        navigate("/products");
      } catch (error) {
        bag.setErrors({ general: error.response.data.message });
      }
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
          <Box my={5} textAlign="left">
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
            </form>
          </Box>
        </Box>
      </Flex>
    </div>
  );
}

export default Login;
