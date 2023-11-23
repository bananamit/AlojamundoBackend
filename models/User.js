const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    nombre: { type: String, required: true },
    apellido: { type: String, required: true },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    passwordHash: { type: String, required: true },
    pais: { type: String, required: false },
    ciudad: { type: String, required: false },
    telefono: { type: String, required: false },
  },
  {
    timestamps: true,
  }
);

userSchema.methods.validatePassword = function (password) {
  return bcrypt.compareSync(password, this.passwordHash);
};

userSchema.methods.setPassword = function (password) {
  const salt = bcrypt.genSaltSync(10);
  this.passwordHash = bcrypt.hashSync(password, salt);
};

const User = mongoose.model("User", userSchema);

module.exports = User;
