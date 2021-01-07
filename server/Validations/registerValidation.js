const yup = require('yup');

const registerSchema = yup.object({
   meno: yup
      .string()
      .matches(/^[a-zA-Z0-9 ]*$/, 'Meno obsahuje nepovolené znaky')
      .required(),
   heslo: yup.string().min(4).required(),

   email: yup.string().email().required(),

   telefon: yup
      .string()
      .matches(/^(\+?\d{0,4})?\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{4}\)?)?$/)
      .required(),

   username: yup
      .string()
      .matches(/^[a-zA-Z0-9_-]*$/)
      .required(),
});

module.exports = registerSchema;
