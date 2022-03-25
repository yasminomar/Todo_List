const express=require("express")
const app=express()
const events=require("./routes/event-routes")
const users=require("./routes/user-routes")
const db=require('./config/database')
var bodyParser = require('body-parser')
const session= require('express-session')
const flash= require('connect-flash')
const passport = require('passport')
const passportSetup = require('./config/passport-setup')
const res = require("express/lib/response")
const cors = require("cors")

app.set('view engine', 'ejs')


app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

//session and flash config
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 60000*15 }
}))
app.use(flash())

//bring passport
app.use(passport.initialize())
app.use(passport.session())
app.use(cors({origin:"http://localhost:3000"}))

//store user object in global variable
app.get('*',(req,res,next)=>{
    res.locals.user=req.user||null
    next()
})

app.use(express.static('public'))
app.use(express.static('node_modules'))

app.use('/events',events)
app.use('/users',users)


app.get('/',(req,res)=>{
    res.redirect('/events')
})




app.listen(3000,()=>{
    console.log("app is listen to 3000 port")
})