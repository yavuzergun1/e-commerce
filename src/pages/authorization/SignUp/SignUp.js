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
import { ErrorMessage, useFormik } from "formik";
import validationSchema from "./Validations";
import { postRegister } from "../../../Data";
import {UseAuth} from "../../../contexts/AuthContext";

function SignUp() {
const {login} = UseAuth();

  const { handleSubmit, handleChange, values, errors, touched } = useFormik({
    initialValues: {
      email: "",
      password: "",
      passwordConfirm: "",
    },
    validationSchema,
    onSubmit: async (values, bag) => {
      try {
        const registerResponse = await postRegister({
          email: values.email,
          password: values.password,
        });
        login(registerResponse)
        console.log(registerResponse);
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
            <Heading>Sign Up</Heading>
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
            </form>
          </Box>
        </Box>
      </Flex>
    </div>
  );
}

export default SignUp;
