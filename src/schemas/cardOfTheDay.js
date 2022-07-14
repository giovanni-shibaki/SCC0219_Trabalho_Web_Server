const mongoose = require('mongoose') 

const cardOfTheDaySchema = new mongoose.Schema({
    cardId: String,
    discount: Number,
    lastUpdate: Date
});

module.exports = mongoose.model('CardOfTheDay', cardOfTheDaySchema);