const Server = require("./models/server");
require("dotenv").config(); //configuración por defecto para leer .env
const server = new Server();
server.execute();
