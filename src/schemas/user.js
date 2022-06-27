const mongoose = require('mongoose') 

const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
    postalCode: String,
    street: String,
    number: String,
    city: String,
    state: String,
    country: String,
    phoneNumber: String,
    isAdmin: Boolean,
});

module.exports = mongoose.model('Users', userSchema);