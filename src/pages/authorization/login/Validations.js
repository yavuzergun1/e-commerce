
import * as yup from "yup";

const Validations = yup.object().shape({
    email: yup
        .string()
        .email('please enter a valid e-mail')
        .required(''),
    password: yup
        .string()
        .min(5,' password must be at least 5 characters')
        .required(''),
});

export default Validations;