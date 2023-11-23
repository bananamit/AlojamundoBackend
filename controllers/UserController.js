const User = require("../models/User");
const generarJWT = require("../helpers/jwt");
const errorHandler = require("../helpers/errorHandler");

const getUserById = (req, res) => {
  User.findById(req.params.id)
    .then((user) => res.json(user))
    .catch((err) => res.status(400).json("Error: " + err));
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return errorHandler(new Error("Usuario no encontrado"), req, res, 400);
    }

    if (!user.validatePassword(password)) {
      return errorHandler(new Error("Contraseña incorrecta"), req, res, 400);
    }

    const token = await generarJWT(user.id, user.email);

    res.json({
      id: user.id,
      nombre: user.nombre,
      token,
    });
  } catch (err) {
    errorHandler(err, req, res);
  }
};

// Registrar usuario
const register = async (req, res) => {
  try {
    const { nombre, apellido, email, password, pais, ciudad, telefono } =
      req.body;
    const existingUser = await User.findOne({
      email: email.toLowerCase().trim(),
    });
    if (existingUser) {
      return res
        .status(409)
        .json({ message: "El correo electrónico ya está registrado." });
    }
    const user = new User({
      nombre,
      apellido,
      email,
      pais,
      ciudad,
      telefono,
    });

    user.setPassword(password);

    await user.save();
    const token = await generarJWT(user.id, user.email);

    res.status(201).json({
      id: user.id,
      nombre: user.nombre,
      token,
    });
  } catch (err) {
    errorHandler(err, req, res);
  }
};

module.exports = {
  getUserById,
  login,
  register,
};
