import * as yup from "yup";

const validations = yup.object().shape({
  username: yup.string().required("Please enter a valid User Name"),
  email: yup
    .string()
    .email("Please enter a valid e-mail")
    .required("please enter a valid e-mail"),
  password: yup
    .string()
    .min(5, " password must be at least 5 characters")
    .required(""),
  passwordConfirm: yup
    .string()
    .oneOf([yup.ref("password")], "passwords do not match")
    .required(""),
});

export default validations;
