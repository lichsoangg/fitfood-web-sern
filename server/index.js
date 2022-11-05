const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
require("dotenv").config();
//route
const authRoute = require("./routes/auth");
const userRoute = require("./routes/user");



const app = express();


//middlewares
app.use(cors({
    origin: process.env.CORS_ORIGIN_URL,
    credentials: true,
}));

app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRoute);
app.use("/api/user", userRoute);

app.use((req, res, next) => {
   const err=new Error("This route doesn't exist")
   err.status=500;
   next(err);
});

app.use((err, req, res, next) => {
    const status=err.status ||500;
    res.status(status).json(err.message);
});

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
    console.log(`Server is running`);
});
