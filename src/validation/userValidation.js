import * as yup from 'yup';

const USER_EMAIL_SCHEMA = yup.string().email();

const USER_PASSWORD_SCHEMA = yup
  .string()
  .matches(
    /^[a-zA-Z0-9]{8,32}$/,
    'Password must contain letters on numbers and be 8 - 32 symbols long'
  );

const USER_PASSWORD_REPEAT_SCHEMA = yup
  .string()
  .oneOf([null, yup.ref('password')]);

const USER_REGISTRATION_SCHEMA = yup.object({
  firstName: yup.string().required().min(2),
  lastName: yup.string().required().min(2),
  email: USER_EMAIL_SCHEMA.required(),
  password: USER_PASSWORD_SCHEMA.required(),
  passwordRepeat: USER_PASSWORD_REPEAT_SCHEMA.required(),
  gender: yup.string().required(),
});

const USER_LOGIN_SCHEMA = yup.object({
  email: USER_EMAIL_SCHEMA.required(),
  password: USER_PASSWORD_SCHEMA.required(),
});



export { USER_REGISTRATION_SCHEMA, USER_LOGIN_SCHEMA };
