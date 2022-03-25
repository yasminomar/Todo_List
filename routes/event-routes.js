const express=require("express")
const router=express.Router()
const List=require('../models/Event')
const Todo=require('../models/Todo')
const { body, validationResult, check } = require('express-validator')
const moment=require('moment')
moment().format()

//middleware to check if user is logged in
isAuthenticated=(req, res,next)=>{
    if(req.isAuthenticated())return next()
    res.redirect('/users/login')
}

//rout to create event
router.get('/create',isAuthenticated,(req,res)=>{
    res.render("event/create",{
        errors:req.flash('errors')
    })
})
router.get('/createTodo:listId',isAuthenticated,(req,res)=>{
    List.findOne({_id:req.params.listId},(err,obj)=>{
        res.render("event/createTodo",{
            listId:req.params.listId,
            listName:obj.ListName,
            errors:req.flash('errors')
        })
    })

})
//rout to home event
router.get('/',(req,res)=>{
    res.render("event/home",{

    })

})

//save event to db
router.post('/create',
[
    check('ListName').isLength({min:1}).withMessage('Enter List Name')
 
],
(req,res)=>{
    const errors=validationResult(req)
    if(!errors.isEmpty()){
        req.flash('errors',errors.array())
        res.redirect('/events/create')
    }
    else{
        let newList=new List({
            ListName:req.body.ListName,
            user_id:req.user.id
        })
        newList.save((err)=>{
            if(!err){
                req.flash('info','the list created successfuly')
                res.redirect('/users/profile')
            }
        })
    }

})
router.post('/createTodo:listId',
[

    check('task').isLength({min:1}).withMessage('Enter Task Name'),
    check('description').isLength({min:1}).withMessage('Enter Task Description '),
    // check('DeadLine').isAfter(Date.now()).withMessage('Deadline must be after today.')
],
(req,res)=>{
    const errors=validationResult(req)
    if(!errors.isEmpty()){
        req.flash('errors',errors.array())
        res.redirect('/events/createTodo'+req.params.listId)


    }
    else{
        let newTodo=new Todo({
            task:req.body.task,
            description:req.body.description,
            list_Id:req.params.listId,
            DeadLine:req.body.DeadLine,
            user_id:req.user.id,
            status:"working"
        })
        newTodo.save((err)=>{
            if(!err){
                req.flash('info','the todo created successfuly')
                res.redirect('/users/profile')
            }
        })
    }

})

// //edit route
router.get('/edit/:id',(req,res)=>{
    Todo.findOne({_id: req.params.id},(err,todo)=>{
        if(!err){
            res.render("event/edit",{
                todo:todo,
                eventDate:moment(todo.DeadLine).format('YYYY-MM-DD'),
                errors:req.flash('errors'),
                message:req.flash('info')

            })
        }     
    })

})
//update the form
router.post('/update',
[
    check('task').isLength({min:1}).withMessage('Enter Task Name .'),
    check('description').isLength({min:1}).withMessage('Enter Task Description .'),
    // check('DeadLine').isAfter(Date.now()).withMessage('Deadline must be after today.')
],
(req,res)=>{
    const errors=validationResult(req)
    if(!errors.isEmpty()){
        req.flash('errors',errors.array())
        res.redirect('/events/edit/'+req.body.id)
    }
    else{
        let newFeilds={
            task:req.body.task,
            description:req.body.description,
            list_Name:req.params.listName,
            DeadLine:req.body.DeadLine,
        }
        let query={_id:req.body.id}
        Todo.updateOne(query,newFeilds,(err)=>{
            if(!err){
                req.flash('info',"the event was updated successfuly")
                res.redirect('/users/profile')
            }
        })
    }
})
router.get('/update/:id',(req,res)=>{
    Todo.findByIdAndUpdate(req.params.id, { status: 'Done' },(err, docs)=> {
    if (err){
        console.log(err)
    }
    else{
        res.redirect('/users/profile');
    }
    });

})


router.get('/delete/:id',(req,res)=>{
    Todo.findByIdAndRemove(req.params.id,(err, docs)=> {
        if (err){
            console.log(err)
        }
        else{
            res.redirect('/users/profile')
        }
    });

})

router.get('/deleteList/:id',(req,res)=>{
    List.findByIdAndRemove(req.params.id,(err, docs)=> {
        if (err){
            console.log(err)
        }
        else{
            res.redirect('/users/profile')
        }
    });

})

module.exports=router