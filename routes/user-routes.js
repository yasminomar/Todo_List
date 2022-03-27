const express=require("express")
const router=express.Router()
const User=require('../models/User')
const List=require('../models/Event')
const Todo=require('../models/Todo')
const passport=require('passport')

//middleware to check if user is logged in
isAuthenticated=(req, res,next)=>{
    if(req.isAuthenticated())return next()
    res.redirect('/users/login')
}
router.get('/signup',(req,res)=>{
    res.render('user/signup',{
        error:req.flash('error')
    })
})

router.post('/signup',
  passport.authenticate('local.signup', {
    successRedirect:'/users/profile',
    failureRedirect: '/users/signup', 
    failureFlash: true })
)
router.get('/login',(req,res)=>{
    res.render('user/login',{
        error:req.flash('error')
    })
})

router.post('/login',
  passport.authenticate('local.login', {
    successRedirect:'/users/profile',
    failureRedirect: '/users/login', 
    failureFlash: true })
)

var result=[];


router.get('/profile',isAuthenticated,(req,res)=>{
    Todo.find({},(err,res)=>{
         result=res;
    })
    List.find({},{},(err,events)=>{
        res.render('user/profile',{
            success:req.flash('success'),
            events:events ,
            allTodos:result,
            message:req.flash('info')

        }) 
    }) 
})
router.get('/filter/:filterMethod',isAuthenticated,(req,res)=>{
    Todo.find({},(err,res)=>{
         result=res;
     })
     List.find({},{},(err,events)=>{
         res.render('user/filter',{
             success:req.flash('success'),
             events:events ,
             filterMethod:req.params.filterMethod,
             allTodos:result
         }) 
     }) 
})
router.get('/logout',(req,res)=>{
    req.logout();
    res.redirect('/events');
})

module.exports=router