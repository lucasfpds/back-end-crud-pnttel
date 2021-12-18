const knex = require("../database/connection");
const bcrypt = require("bcrypt");
const registerUsersSchema = require("../validations/registerUsersSchema");
const updateUserProfileSchema = require("../validations/updateUserProfileSchema");

const registerUsers = async (req, res) => {
  const { name, email, cpf, pis, password } = req.body;

  try {
    await registerUsersSchema.validate(req.body);

    let numberOfUsers = await knex("users").where({ cpf }).first();

    if (numberOfUsers) {
      return res.status(400).json("CPF já cadastrado.");
    }

    numberOfUsers = await knex("users").where({ pis }).first();

    if (numberOfUsers) {
      return res.status(400).json("PIS já cadastrado.");
    }

    numberOfUsers = await knex("users").where({ email }).first();

    if (numberOfUsers) {
      return res.status(400).json("Email já cadastrado.");
    }

    const encryptedPassword = await bcrypt.hash(password, 10);

    const user = await knex("users")
      .insert({
        name,
        email,
        cpf,
        pis,
        password: encryptedPassword,
      })
      .returning("*");

    if (!user) {
      return res.status(400).json("O usuário não foi cadastrado.");
    }

    const adress = await knex("adresses")
      .insert({
        user_id: user[0].id,
        cep: req.body.adress.cep,
        rua: req.body.adress.rua,
        numero: req.body.adress.numero,
        complemento: req.body.adress.complemento,
        bairro: req.body.adress.bairro,
        municipio: req.body.adress.municipio,
        estado: req.body.adress.estado,
        pais: req.body.adress.pais,
      })
      .returning("*");

    if (!adress) {
      return res.status(400).json("O endereço não foi cadastrado.");
    }
    
    const { password: _, ...userData } = user[0];
    const returnAll = {
      user: userData,
      adress: adress[0],
    };
    return res.status(200).json(returnAll);
  } catch (error) {
    return res.status(400).json(error.message);
  }
};

const getUser = async (req, res) => {
  return res.status(200).json(req.user);
};

const updateUserProfile = async (req, res) => {
  const { name, email, adress, cpf, pis, password } = req.body;

  const { id } = req.user;
  let newPassword = password.length > 6 ? password : undefined;
  try {
    await updateUserProfileSchema.validate(req.body);
    const numberOfUsers = await knex("users").where({ id }).first();

    if (!numberOfUsers) {
      return res.status(404).json("Usuario não encontrado");
    }

    if (password) {
      newPassword = await bcrypt.hash(password, 10);
    }

    if (email && email !== req.user.email) {
      const findEmail = await knex("users").where({ email }).first();

      if (findEmail) {
        return res.status(400).json("O Email já existe.");
      }
    }

    if (cpf && cpf !== req.user.cpf) {
      const findCpf = await knex("users").where({ cpf }).first();

      if (findCpf) {
        return res.status(400).json("CPF já cadastrado.");
      }
    }

    if (pis && pis !== req.user.pis) {
      const findPis = await knex("users").where({ pis }).first();

      if (findPis) {
        return res.status(400).json("PIS já cadastrado.");
      }
    }

    const updatedUser = await knex("users")
      .where({ id })
      .update({
        name,
        email,
        cpf,
        pis,
        password: newPassword,
      })
      .returning("id");

    if (!updatedUser) {
      return res.status(400).json("O usuario não foi atualizado");
    }

    const { adress_id } = await knex("adresses").where({ user_id: id }).first();

    const updatedAdress = await knex("adresses")
      .where({ adress_id })
      .update({
        cep: req.body.adress.cep,
        rua: req.body.adress.rua,
        numero: req.body.adress.numero,
        complemento: req.body.adress.complemento,
        bairro: req.body.adress.bairro,
        municipio: req.body.adress.municipio,
        estado: req.body.adress.estado,
        pais: req.body.adress.pais,
      })
      .returning("*");

    if (!updatedAdress) {
      return res.status(400).json("O endereço não foi Atualizado.");
    }

    const returnAll = {
      user: updatedUser[0],
      adress: adress[0],
    };
    return res.status(200).json("Usuario foi atualizado com sucesso.");
  } catch (error) {
    return res.status(400).json(error.message);
  }
};

const deleteUser = async (req, res) => {
  const { id } = req.user;

  try {
    const deteledAdress = await knex("adresses").where({ user_id: id }).del();

    if (!deteledAdress) {
      return res.status(400).json("O endereço não foi deletado.");
    }

    const deteledUser = await knex("users").where({ id }).del();

    if (!deteledUser) {
      return res.status(400).json("O usuario não foi deletado.");
    }

    return res.status(200).json("Usuario deletado com sucesso.");
  } catch (error) {
    return res.status(400).json(error.message);
  }
};

module.exports = {
  registerUsers,
  getUser,
  updateUserProfile,
  deleteUser,
};
