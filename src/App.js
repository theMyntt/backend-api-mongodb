const express = require("express");
const collection = require("./data");
const crypto = require("crypto-js");
const path = require("path");

const app = express();
const port = 3000;
const routes = {
  1: { path: "/" },
  2: { path: "/api/signup" },
  3: { path: "/api/signin" },
};

app.use(express.json());
app.use(express.static(path.join(__dirname, "../public")));

app.get(routes[1].path, (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.post(routes[2].path, async (req, res) => {
  const postData = {
    name: req.body.name,
    email: req.body.email.toLowerCase(),
    password: crypto.SHA256(req.body.password).toString(),
  };

  try {
    await collection.insertMany([postData]);
    res.status(200).json("Cadastrado");
  } catch (error) {
    res.status(500).json("Erro interno");
  }
});

app.post(routes[3].path, async (req, res) => {
  const postData = {
    email: req.body.email.toLowerCase(),
    password: crypto.SHA256(req.body.password).toString(),
  };

  try {
    const check = await collection.findOne({ email: postData.email });

    if (postData.password === check.password) {
      res.status(200).json(check);
    } else {
      res.status(404).json("Usuário ou senha errados/inexistentes");
    }
  } catch (error) {
    res.status(500).json("Erro ao pesquisar.")
  }

});

app.listen(port, () => {
  console.log("Porta conectada em: localhost:" + port);
});
