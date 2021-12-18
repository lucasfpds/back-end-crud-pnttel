const yup = require("yup");

const loginSchema = yup.object().shape({
  identifier: yup.string().required(),
  password: yup.string().required(),
});

module.exports = loginSchema;
