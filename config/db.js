const mongoose = require("mongoose");

const mongoURL =
  "mongodb+srv://user:3Jl5HM7MiCiC0qZB@cluster0.btwl3en.mongodb.net/alojamundo";
0;
mongoose
  .connect(mongoURL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Conexión exitosa a MongoDB"))
  .catch((err) => console.error("Error al conectar con MongoDB", err));

module.exports = mongoose;
