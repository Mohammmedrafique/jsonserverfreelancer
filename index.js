// server.js
const jsonServer = require("json-server");
const server = jsonServer.create();
const router = jsonServer.router("db.json");
const freelancer = jsonServer.router("freelancers.json");
const middlewares = jsonServer.defaults();

server.use(middlewares);
server.use(router);
server.use(freelancer);

server.listen(8000, () => {
  console.log("JSON Server is running");
});
