/*
  Giovanni Shibaki Camargo    Nusp: 11796444
  Lucas Keiti Anbo Mihara     Nusp: 11796472
*/

"use strict";

const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const CardsModel = require("../schemas/cards");
const CardOfTheDayModel = require('../schemas/cardOfTheDay')

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

router.post("/buyCards", async (req, res, next) => {
  try{
    let cardsIds = req.body;
    cardsIds.forEach( async (c) => {
      await CardsModel.updateOne(
        { "id": c.id },
        { "$inc": { "quantity": -c.qtd } }
      )
    });
  } catch (e) {
    res.status(500).send({
      message: "Falha ao processar sua requisição",
      erro: e.message,
    });
  }
});

router.get("/getCardOfTheDay", async (req, res, next) => {
  try {
    let lastCard = (await CardOfTheDayModel.find().sort({"lastUpdate": -1}).limit(1))[0]

    let today = new Date(); 
    let lastUpdate = lastCard.lastUpdate
    let difference = Math.abs(today - lastUpdate);
    let days = difference/(1000 * 3600 * 24)

    let card
    if (days >= 1) {
      let cards = await CardsModel.find();
      card = cards[Math.floor(Math.random() * cards.length)];
      new CardOfTheDayModel({
        cardId: card.id,
        discount: 0.5,
        lastUpdate: today
      }).save((err, doc) => {
        console.log(err);
      });
    } else {
      card = await CardsModel.findOne({"id": lastCard.cardId})
    }
    card.tcgplayer.prices.holofoil.low *= 0.5
    console.log(card)
    res.send(card)



    // let userEmail = req.body;
    // let user = await UsersModel.findOne({ "email": userEmail.userEmail })

    // if (!user.cardOfTheDay) {
    //   user.cardOfTheDay = {
    //     cardId: null,
    //     discount: null,
    //     lastDay: null
    //   }
    // }

    // user.cardOfTheDay.lastDay ??= "2000-01-01"
    // let today = new Date(); 
    // var lastDay = new Date(user.cardOfTheDay.lastDay);

    // let difference = Math.abs(today - lastDay);
    // let days = difference/(1000 * 3600 * 24)

    // if (days >= 1) {
      
    //   user.cardOfTheDay = {
    //     cardId: newCard.id,
    //     discount: 0.5,
    //     lastDay: today
    //   }
    //   user = {...user, ...user.cardOfTheDay}
    //   console.log(user);
    //   UsersModel.findOneAndUpdate({ "email": userEmail.userEmail }, user);
    // }
  } catch (e) {
    console.log("Erro", e)
    res.status(500).send({
      message: "Falha ao processar sua requisição",
      erro: e.message,
    });
  }
});



module.exports = router;
