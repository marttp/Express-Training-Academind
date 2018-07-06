const mongoose = require('mongoose');

const orderSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    productID: { type:mongoose.Schema.Types.ObjectId, ref:'Product' , require:true},
    quantity: { type:Number, default:1 },
});


//export to use this schema in file js
module.exports = mongoose.model('Order',orderSchema);