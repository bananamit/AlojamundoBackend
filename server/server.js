const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const { mongoose } = require("mongoose");

class Server {
  constructor() {
    this.app = express();
    this.port = "8080";
    this.server = require("http").createServer(this.app);

    this.paths = {
      accomodations: "/accomodation",
      usuario: "/user",
    };

    this.connectToDB();
    this.addMiddlewares();
    this.setRoutes();
  }

  async connectToDB() {
    try {
      await mongoose.connect(
        "mongodb+srv://user:3Jl5HM7MiCiC0qZB@cluster0.btwl3en.mongodb.net/alojamundo",
        {
          useNewUrlParser: true,
          useUnifiedTopology: true,
        }
      );
      console.log("Conexión exitosa a MongoDB");
    } catch (error) {
      console.error("Error al conectar a MongoDB", error);
      process.exit(1);
    }
  }

  addMiddlewares() {
    this.app.use(cors());
    this.app.use(bodyParser.json());
    this.app.use(bodyParser.urlencoded({ extended: true }));
    this.app.use(express.static("files"));
  }

  setRoutes() {
    this.app.use(this.paths.usuario, require("../routes/UserRouter"));
    this.app.use(
      this.paths.accomodations,
      require("../routes/AccomodationRouter")
    );
  }

  listen() {
    this.server.listen(this.port, () => {
      console.log(`Servidor corriendo en el puerto ${this.port}`);
    });
  }
}

module.exports = { Server };
