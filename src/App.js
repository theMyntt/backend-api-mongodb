const express = require("express");
const mongoose = require("mongoose");
// const data = require("./data");s
const collection = require("./data");
const crypto = require("crypto-js")

const app = express();
const port = 3000;
const routes = {
  1: {path: "/"},
  2: {path: "/api/signup"},
  3: {path: "/api/signin"}
}

app.use(express.json());

app.get(routes[1].path, (req, res) => {
  res.send("GET /");
});

app.post(routes[2].path, async (req, res) => {
  const postData = {
    name: req.body.name,
    email: req.body.email.toLowerCase(),
    password: crypto.SHA256(req.body.password).toString(),
  };

  // console.log(postData.email);
  await collection.insertMany([postData]);

  res.send(JSON.stringify("Inserido."))
});

app.post(routes[3].path, async (req, res) => {
  const postData = {
    email: req.body.email.toLowerCase(),
    password: crypto.SHA256(req.body.password).toString(),
  };

  // console.log(postData.email);
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
