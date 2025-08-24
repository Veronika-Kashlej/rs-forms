import * as yup from 'yup';

export const schema = yup.object().shape({
  name: yup
    .string()
    .required('Name is required')
    .matches(/^[A-Z]/, 'First letter must be uppercase'),
  age: yup
    .number()
    .typeError('Age must be a number')
    .positive('Age must be positive')
    .integer('Age must be an integer')
    .required('Age is required'),
  email: yup
    .string()
    .email('Invalid email format')
    .required('Email is required'),
  password: yup
    .string()
    .required('Password is required')
    .min(8, 'Password must be at least 8 characters')
    .matches(/\d/, 'Password requires a number')
    .matches(/[a-z]/, 'Password requires a lowercase letter')
    .matches(/[A-Z]/, 'Password requires an uppercase letter')
    .matches(/[^a-zA-Z0-9]/, 'Password requires a special character'),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password')], 'Passwords must match')
    .required('Confirm Password is required'),
  gender: yup.string().required('Gender is required'),
  terms: yup
    .boolean()
    .oneOf([true], 'You must accept the terms and conditions'),
  picture: yup
    .mixed()
    .test('fileSize', 'File too large', (value) => {
      if (!value || !(value instanceof FileList) || value.length === 0)
        return true;
      return value[0].size <= 2000000;
    })
    .test('fileType', 'Unsupported file format', (value) => {
      if (!value || !(value instanceof FileList) || value.length === 0)
        return true;
      return ['image/jpeg', 'image/png'].includes(value[0].type);
    }),
  country: yup.string().required('Country is required'),
});
