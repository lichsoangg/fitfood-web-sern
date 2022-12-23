const express = require("express")
const cors = require("cors")
const cookieParser = require("cookie-parser")

require("dotenv").config()
//route
const authRoute = require("./routes/auth")
const userRoute = require("./routes/user")
const customerRoute = require("./routes/customer")
const employeeRoute = require("./routes/employee")
const productTypeRoute = require("./routes/product_type")
const productRoute = require("./routes/product")
const providerRoute = require("./routes/provider")
const deliveryNoteRoute = require("./routes/delivery_note")
const deliveryNoteDetailRoute = require("./routes/delivery_note_detail")
const app = express()


//middlewares
app.use(cors({
  origin: process.env.CORS_ORIGIN_URL,
  credentials: true,
}))

app.use(express.json())
app.use(cookieParser())

app.use("/images", express.static(__dirname + process.env.IMAGE_ENDPOINT_URL))

app.use("/api/auth", authRoute)
app.use("/api/user", userRoute)
app.use("/api/customer", customerRoute)
app.use("/api/employees", employeeRoute)
app.use("/api/product-type", productTypeRoute)
app.use("/api/products", productRoute)
app.use("/api/providers", providerRoute)
app.use("/api/delivery-note", deliveryNoteRoute)
app.use("/api/delivery-note-detail", deliveryNoteDetailRoute)


app.use((req, res, next) => {
  const err = new Error("This route doesn't exist")
  err.status = 500
  next(err)
})

app.use((err, req, res, next) => {
  const status = err.status || 400
  res.status(status).json({ message: err.message })
})

const PORT = process.env.PORT || 8000
app.listen(PORT, () => {
  console.log(`Server is running`)
})