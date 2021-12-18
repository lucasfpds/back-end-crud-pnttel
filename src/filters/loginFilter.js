require("dotenv").config();
const knex = require("../database/connection");
const jwt = require("jsonwebtoken");

const loginFilter = async (req, res, next) => {
  
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).json("Não autorizado");
  }
  try {
    const token = authorization.replace("Bearer ", "").trim();
    
    const { id } = jwt.verify(token, process.env.PASSWORD_JWT);

    const findUser = await knex("users").where({ id }).first();

    if (!findUser) {
      return res.status(404).json("Usuario não encontrado");
    }
    
    const { password, ...user } = findUser;

    
    const adress = await knex("adresses").where({ user_id: user.id }).first();


    req.user = {...user, adress};

    next();
  } catch (error) {
    return res.status(400).json(error.message);
  }
};

module.exports = loginFilter;
