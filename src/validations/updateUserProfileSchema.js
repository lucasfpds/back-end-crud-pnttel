const yup = require("yup");

const atualizacaoUsuarioSchema = yup.object().shape({
  email: yup.string().email().required(),
  name: yup.string().required(),
  adress: yup.object().required(),
  cpf: yup.string().required(),
  pis: yup.string().required(),
});

module.exports = atualizacaoUsuarioSchema;
