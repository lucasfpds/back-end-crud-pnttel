const yup = require("yup");

const registerUsersSchema = yup.object().shape({
  email: yup.string().email().required(),
  name: yup.string().required(),
  adress: yup.object().required(),
  cpf: yup.string().required(),
  pis: yup.string().required(),
  password: yup.string().required(),
});

module.exports = registerUsersSchema;
