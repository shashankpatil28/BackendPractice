const mongoose = require("mongoose");
require("dotenv").config();

const connect = () => {
    mongoose.connect(process.env.MONGO_URI, {
        dbName: "temporary"
    })
    .then(() => console.log("Database successfully Connected !!!"))
    .catch((error) => {
        console.log("DB Connection Failed");
        console.error(error);
        process.exit(1);
    })
}

module.exports = { connect };