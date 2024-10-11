const express = require("express");
const app = express();

const database = require("./config/database.js");
const cookieParser = require("cookie-parser");
const dotenv = require("dotenv")
const cors = require("cors");

const productRoutes = require("./routes/productRoutes.js")
const userRoutes = require("./routes/userRoutes.js")

dotenv.config();

const PORT = process.env.PORT || 4000;

app.use(express.json());
app.use(cors());
app.use(cookieParser());

app.use("/api/v1/product", productRoutes)
app.use("/api/v1/user", userRoutes)

app.get("/", (req, res) => {
    return res.json({
      success: true,
      message: "Your server is up and running....",
    });
  });


const connect = async () => {
    try {
        await database.connect();
        app.listen(PORT, () => {
            console.log(`App is running at http://localhost:${PORT}`);
        });
    } catch (error) {
        console.log("connection to server is failed with error : ", error);
        process.exit(1);
    }
}

connect();


