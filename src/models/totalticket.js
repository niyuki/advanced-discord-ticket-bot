const mongoose = require('mongoose');

let TotalTicket = new mongoose.Schema({
    User: String,
    TotalTicket: {type: Number, default: 0}
})

module.exports = mongoose.model('TotalTicker', TotalTicket)