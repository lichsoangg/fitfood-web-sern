const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const createError = require("http-errors");
require("dotenv").config();
//route
const authRoute = require("./routes/auth");
const userRoute = require("./routes/user");



const app = express();


//middlewares
app.use(cors());
app.use(express.json());


app.use("/api/auth", authRoute);
app.use("/api/user", userRoute);

app.use((req, res, next) => {
    next(createError.NotFound("This route doesn't exist"));
});

app.use((err, req, res, next) => {
    res.json(createError(err.status || 500, err.message));
});

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
    console.log(`Server is running`);
});
