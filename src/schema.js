const mongoose = require('mongoose');

let UserTickets = new mongoose.Schema({
    User: String,
    OpenedTicketChannel: String,
    OpenedTicketTime: Number,
    TotalTicket: {type: Number, default: 0}
})

module.exports = mongoose.model('UserTickets', UserTickets)