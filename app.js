const express = require("express")
const app = express()
const cors = require("cors")
const flash = require("connect-flash")
const session = require("express-session")

// middleware
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: false}))



let sessionOptions = session({
    store: new (require('connect-pg-simple')(session)),
    secret: "javascript is cool",
    resave: false,
    saveUninitialized: false,
    cookie: {maxAge: 1000 * 60 * 60 * 24, httpOnly: true, secure: true}
})

app.use(sessionOptions)
app.use(flash())


app.use(function (req, res, next) {
    // make all error and success flash messages available from all templates
    res.locals.errors = req.flash("errors")
    res.locals.success = req.flash("success")
    
    
    next()
})

const router = require("./router")

app.use(express.static("public"))
app.set("views", "views")
app.set("view engine", "ejs")

app.use("/", router)


app.listen(process.env.PORT, function() {
    console.log("Server is running on port " + process.env.PORT)
})