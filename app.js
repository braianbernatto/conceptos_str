const express = require("express")
const app = express()
const csrf = require("csurf")
const cors = require("cors")
const flash = require("connect-flash")
const session = require("express-session")
const pgSession = require('connect-pg-simple')(session)
const pool = require("./db")


// middleware
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: false}))

// app.set('trust proxy', 1) // trust first proxy

let sessionOptions = session({
    store: new pgSession({pool : pool.$pool}),
    secret: process.env.SESSIONPASS,
    resave: false,
    saveUninitialized: false,
    cookie: {maxAge: 1000 * 60 * 60 * 24, httpOnly: true},
})

app.use(sessionOptions)
app.use(flash())


app.use(function (req, res, next) {
    // make all error and success flash messages available from all templates
    res.locals.errors = req.flash("errors")
    res.locals.success = req.flash("success")
    
    // make user session data available from within view templates
    res.locals.user = req.session.user
    
    next()
})

const router = require("./router")

app.use(express.static("public"))
app.set("views", "views")
app.set("view engine", "ejs")

app.use(csrf())

app.use(function (req, res, next) {
    res.locals.csrfToken = req.csrfToken()
    next()
})

app.use("/", router)

app.use(function (err, req, res, next) {
    if (err) {
        if (err.code == "EBADCSRFTOKEN") {            
            req.flash("errors", "Cross site request forgery detected")
            req.session.save(() => res.redirect("/login1"))
        }else{
            req.flash("errors", "Please try again later")
        }
    }
})


module.exports = app
