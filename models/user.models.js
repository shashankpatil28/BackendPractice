const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    id : {
        type : Number,
        required: true,
    },
    name : {
        type : String,
        required: true,
    },
    age : {
        type : Number,
    },
})

module.exports = mongoose.model("User", userSchema);