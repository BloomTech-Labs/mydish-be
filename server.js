const express = require("express");

const server = express();

//const fooRouter = require("./routers/fooRouter");

server.use(express.json());
//server.use('/foos', fooRouter);
const CooksRouter = require("./routers/cooks.js");
server.use("/cooks", CooksRouter);

server.get("/", (req, res) => {
  res.status(200).json({ hello: "world", recieved: req.body });
});

module.exports = server;
