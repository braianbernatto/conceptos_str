const express = require("express")
const app = express()
const cors = require("cors")

// middleware
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: false}))


const router = require("./router")

app.use(express.static("public"))
app.set("views", "views")
app.set("view engine", "ejs")

app.use("/", router)

app.listen(process.env.PORT, function() {
    console.log("Server is running on port " + process.env.PORT)
})