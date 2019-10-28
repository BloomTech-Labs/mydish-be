const express = require("express");

const server = express();

//const fooRouter = require("./routers/fooRouter");

server.use(express.json());
//server.use('/foos', fooRouter);
const CooksRouter = require("./routers/cooks.js");
const RecipeRouter = require("./routers/recipes.js");
const CookbookRouter = require("./routers/cookbook.js")

server.use("/cooks", CooksRouter);
server.use("/recipes", RecipeRouter);
server.use("/cookbook", CookbookRouter);

server.get("/", (req, res) => {
  res.status(200).json({ hello: "world", recieved: req.body });
});

module.exports = server;
