const express = require("express");
const mongoose = require("mongoose");
// const data = require("./data");s
const collection = require("./data");

const app = express();
const port = 3000;

app.use(express.json());

app.get("/", (req, res) => {
  res.send("hello world");
});

app.post("/api/signup", async (req, res) => {
  const postData = {
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
  };

  await collection.insertMany([postData]);

  res.send(JSON.stringify("Inserido."))
});

app.post("/api/signin", async (req, res) => {
  const postData = {
    email: req.body.email,
    password: req.body.password,
  };

  const check = await collection.findOne({ email: postData.email });

  if (postData.password === check.password) {
    res.send(JSON.stringify(check));
  }else {
    res.send("Error.")
  }
})

app.listen(port, () => {
  console.log("Porta conectada em: " + port);
});
