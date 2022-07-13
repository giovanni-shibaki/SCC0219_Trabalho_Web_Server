/*
  Giovanni Shibaki Camargo    Nusp: 11796444
  Lucas Keiti Anbo Mihara     Nusp: 11796472
*/

"use strict";

const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const CardsModel = require("../schemas/cards");

mongoose.connect(
  "mongodb+srv://pokecard:pokecard@pokecarddb.o75xi.mongodb.net/pokecard?retryWrites=true&w=majority"
);

router.post("/getAllCards", async (req, res, next) => {
  try {
    let cards = await CardsModel.find();
    console.log(cards[0]);
    res.status(200).send(cards);
  } catch (e) {
    res.status(500).send({
      message: "Falha ao processar sua requisição",
      erro: e.message,
    });
  }
});

router.post("/getCard", async (req, res, next) => {
  try {
    let id = req.body;
    console.log(id);

    let card = await CardsModel.findOne(id);
    console.log(card);
    res.status(200).send(card);
  } catch (e) {
    res.status(500).send({
      message: "Falha ao processar sua requisição",
      erro: e.message,
    });
  }
});

router.post("/getCardQtd", async (req, res, next) => {
  try {
    console.log("Teste");

    let id = req.body;
    console.log(id);

    let card = await CardsModel.findOne(id);
    console.log(card);
    res.status(200).send(card);
  } catch (e) {
    res.status(500).send({
      message: "Falha ao processar sua requisição",
      erro: e.message,
    });
  }
});

router.post("/updateCardById", async (req, res, next) => {
  try {
    let data = req.body.data;
    console.log(data);

    const filter = { id: data.id };

    let card = await CardsModel.findOneAndUpdate(filter, data);
    console.log("Carta: " + card);
    res.status(200).send(card);
  } catch (e) {
    res.status(500).send({
      message: "Falha ao processar sua requisição",
      erro: e.message,
    });
  }
});

router.post("/addCard", async (req, res, next) => {
  try {
    let card = req.body;
    new CardsModel(card).save((err, doc) => {
      console.log(err);
    });
    console.log(card);
    res.send(card);
  } catch (e) {
    res.status(500).send({
      message: "Falha ao processar sua requisição",
      erro: e.message,
    });
  }
});

module.exports = router;
