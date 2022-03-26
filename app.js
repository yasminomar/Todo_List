const express=require("express")
const app=express()
const events=require("./routes/event-routes")
const users=require("./routes/user-routes")
// const db=require('./config/database')
var bodyParser = require('body-parser')
const session= require('express-session')
const flash= require('connect-flash')
const passport = require('passport')
const passportSetup = require('./config/passport-setup')
const res = require("express/lib/response")
const cors = require("cors")
const config = require('config');
const  mongoose  = require("mongoose")
require("dotenv").config();



app.set('view engine', 'ejs')
const port =  3000;
const uri=process.env.MONGODB_CONNECTION_STRING;


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

//store user object in global variable
app.get('*',(req,res,next)=>{
    res.locals.user=req.user||null
    next()
})

app.use(express.static('public'))
app.use(express.static('node_modules'))
app.use(express.json());

app.use('/events',events)
app.use('/users',users)


app.get('/',(req,res)=>{
    res.redirect('/events')
})
mongoose.connect(uri,{
    useNewUrlParser:true,
    // useCreateIndex:true,
    useUnifiedTopology:true,
});
const connection=mongoose.connection;
connection.once("open",()=>{
    console.log("MongoDB database connection established successfully");
})



app.listen(port,()=> console.log(`app is listen to ${port} port`))