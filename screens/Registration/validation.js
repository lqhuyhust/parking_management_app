import * as Yup from "yup";

const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/

export const registrationValidationSchema = Yup.object().shape({
  first_name: Yup
    .string()
    .required('First name is required'),
  last_name: Yup
    .string()
    .required('Last name is required'),
  username: Yup
    .string()
    .required('Username is required'),
  password: Yup
    .string()
    // .min(8, ({min}) => `Password must be at least ${min} characters`)
    .required('Password is required'),
  confirmPassword: Yup
    .string()
    .oneOf([Yup.ref('password')], 'Passwords do not match')
    .required('Confirm password is required'),
  email: Yup
    .string()
    .email('Please enter valid email')
    .required('Email address is required'),
  phone: Yup
    .string()
    .matches(phoneRegExp, 'Phone number is not valid')
    .required('Phone number is required'),
})
