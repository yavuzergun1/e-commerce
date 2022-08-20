import * as yup from "yup";

const editScheme = yup.object().shape({
    title: yup.string().required(), /* title zorunlu ve string bir alan */
    description: yup.string().min(5).required(), /* title zorunlu string bir alan ve en az 5 karakter */
    price:yup.string().required(), /* title zorunlu ve string bir alan */
})

export default editScheme;