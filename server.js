const express = require("express");

const server = express();

//const fooRouter = require("./routers/fooRouter");

server.use(express.json());
//server.use('/foos', fooRouter);
const AuthRouter = require("./routers/auth.js");
server.use("/auth", AuthRouter);

server.get("/", (req, res) => {
  res.status(200).json({ hello: "world", recieved: req.body });
});

module.exports = server;
