var mongoose  = require('mongoose');
var Schema    = mongoose.Schema;

var OrderSchema   = new Schema({
    first_name: String,
    last_name: String,
    phone: Number,
    email: String
});

module.exports = mongoose.model('Order', OrderSchema);