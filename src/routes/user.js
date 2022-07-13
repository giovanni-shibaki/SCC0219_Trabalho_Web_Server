/*
  Giovanni Shibaki Camargo    Nusp: 11796444
  Lucas Keiti Anbo Mihara     Nusp: 11796472
  Vítor Caetano Brustolin     Nusp: 11795589
*/

"use strict";

const express = require("express");
const router = express.Router();
const mongoose = require('mongoose');

const UsersModel = require('../schemas/user')

mongoose.connect('mongodb+srv://pokecard:pokecard@pokecarddb.o75xi.mongodb.net/pokecard?retryWrites=true&w=majority')

router.post("/signup", async (req, res, next) => {
  try {

    let user = req.body;
    new UsersModel(user).save((err, doc) => {
      console.log(err)
    })
    console.log(user)
    res.send(user)
  } catch (e) {
    res.status(500).send({
      message: "Falha ao processar sua requisição",
      erro: e.message,
    });
  }
});

router.post("/signin", async (req, res, next) => {
  try {
    let login = req.body;
    console.log(login)

    let user = await UsersModel.findOne(login);
    console.log(user);
    res.status(200).send(user)
  } catch (e) {
    res.status(500).send({
      message: "Falha ao processar sua requisição",
      erro: e.message,
    });
  }
});

router.post("/getUser", async (req, res, next) => {
  try {
    let data = req.body;
    console.log(data);
    const filter = { email: data.email };

    let user = await UsersModel.findOne(filter);
    console.log(user);
    res.status(200).send(user)
  } catch (e) {
    res.status(500).send({
      message: "Falha ao processar sua requisição",
      erro: e.message,
    });
  }
});

router.post("/updateUserByEmail", async (req, res, next) => {
  try {
    let data = req.body;
    console.log(data);

    const filter = { email: data.email };

    let user = await UsersModel.findOneAndUpdate(filter, data);
    console.log("Usuario: " + user);
    res.status(200).send(user);
  } catch (e) {
    res.status(500).send({
      message: "Falha ao processar sua requisição",
      erro: e.message,
    });
  }
});

module.exports = router;
