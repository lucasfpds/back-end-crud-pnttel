require("dotenv").config();
const knex = require("../database/connection");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const loginSchema = require("../validations/loginSchema");

const login = async (req, res) => {
  const { identifier, password } = req.body;

  try {
    await loginSchema.validate(req.body);

    let user = await knex("users").where({ cpf: identifier }).first();

    if (!user) {
      user = await knex("users").where({ pis: identifier }).first();
      if (!user) {
        user = await knex("users").where({ email: identifier }).first();
        if (!user) {
          return res.status(404).json("Email, CPF ou PIS não encontrado");
        }
      }
    }
    
    const adress = await knex("adresses").where({ user_id: user.id }).first();

    const correctPassword = await bcrypt.compare(password, user.password);
    
    if (!correctPassword) {
      return res.status(400).json("Usuário e/ou senha inválidos");
    }

    const token = jwt.sign({ id: user.id }, process.env.PASSWORD_JWT, {
      expiresIn: "8h",
    });

    const { password: _, ...userData } = user;
    
    return res.status(200).json({
      user: {...userData, adress},
      token,
    });
  } catch (error) {
    return res.status(400).json(error.message);
  }
};

module.exports = {
  login,
};
