const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
require("dotenv").config();


const app = express();
app.use(cors());



const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
    console.log(`Server is running`);
});
