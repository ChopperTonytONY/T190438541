const express = require("express");
const path = require("path");
const app = express();
const bodyParse = require("body-parser");
const dotenv = require("dotenv");
const userRouter = require("./routes/userRoutes");
dotenv.config();
const { default: mongoose } = require("mongoose");
app.use(bodyParse.urlencoded({ extended: false }));
app.use(bodyParse.json());

app.listen(5000, () => {
    console.log(`server is running http://localhost:5000/`);
});
const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI);
        console.log(`Mongo connected ${conn.connection.host}`);
    } catch (error) {
        console.log(`error ${error.message}`);
        process.exit();
    }
};
app.use("/user", userRouter);
connectDB();