const mongoose=require('mongoose')
const todoSchema=new mongoose.Schema({
    task:{
        type:String,
        require:true
    },
    description:{
        type:String,
        require:true
    },
    DeadLine:{
        type:Date,
        require:true 
    },
    status:{
        type:String,
        require:true
    },
    list_Id:{
        type:mongoose.Types.ObjectId,
        require:true

    },
    user_id : {
        type:mongoose.Types.ObjectId,
        require:true
    }

})


let Todo=mongoose.model('Todo',todoSchema)


module.exports=Todo