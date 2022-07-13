const mongoose = require('mongoose') 

const cardSchema = new mongoose.Schema({
    id: String,
    name: String,
    supertype: String,
    subtypes: Array,
    hp: Number,
    types: Array,
    attacks: Array,
    weaknesses: Array,
    retreatCost: Array,
    convertedRetreatCost: Number,
    set: Object,
    number: Number,
    artist: String, 
    rarity: String,
    flavorTest: String,
    nationalPokedexNumbers: Array,
    legalities: Object,
    regulationMark: String,
    images: Object,
    tcgplayer: Object,
    cardmarket: Object,
    quantity: Number
});

module.exports = mongoose.model('Cards', cardSchema);