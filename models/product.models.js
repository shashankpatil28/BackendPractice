const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    id : {
        type : Number,
        required: true,
    },
    name : {
        type : String,
        required: true,
    },
    price : {
        type : Number,
    },
})

module.exports = mongoose.model("Product", productSchema);