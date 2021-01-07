const yup = require('yup');

const loginSchema = yup.object({
   username: yup
      .string()
      //   .matches(/^[a-zA-Z0-9_-]*$/)
      .required(),
   heslo: yup.string().required(),
});

module.exports = loginSchema;
