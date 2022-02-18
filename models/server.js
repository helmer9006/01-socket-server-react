const express = require("express");
const http = require("http");
const path = require("path");
const socketIo = require("socket.io");
const Sockets = require("./socket");
const cors = require("cors");
class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT;

    //http server
    this.server = http.createServer(this.app);

    //Configuración del socket server
    this.io = socketIo(this.server, {
      /*configuraciones*/
      cors: { origin: "*" },
    });
  }
  middleware() {
    //desplegar directorio publico
    this.app.use(express.static(path.resolve(__dirname, "../public")));
    this.app.use(cors());
  }

  configurarSockets() {
    //instanciar clase socket
    new Sockets(this.io);
  }

  execute() {
    //Inicializar Middlewares
    this.middleware();

    //Inicializar sockets
    this.configurarSockets();

    this.server.listen(this.port, () => {
      console.log("Servidor iniciado correctamente en el puerto: ", this.port);
    });
  }
}

module.exports = Server;
