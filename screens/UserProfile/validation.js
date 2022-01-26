import * as Yup from "yup";

const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/

export const editSchema = Yup.object().shape({
  first_name: Yup
    .string(),
  last_name: Yup
    .string(),
  email: Yup
    .string()
    .email('Please enter valid email'),
  phone: Yup
    .string()
    .matches(phoneRegExp, 'Phone number is not valid')
})

export const changePasswordSchema = Yup.object().shape({
  old_password: Yup
    .string()
    // .min(8, ({min}) => `Password must be at least ${min} characters`)
    .required('Password is required'),
  new_password: Yup
    .string()
    // .min(8, ({min}) => `Password must be at least ${min} characters`)
    .required('Password is required'),
  confirmPassword: Yup
    .string()
    .oneOf([Yup.ref('password')], 'Passwords do not match')
    .required('Confirm password is required'),
})
