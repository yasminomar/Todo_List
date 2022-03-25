const mongoose=require('mongoose')
const listSchema= new mongoose.Schema({
    ListName:{
        type:String,
        require:true
    },
    user_id : {
        type:mongoose.Types.ObjectId,
        require:true
    },
})

let List=mongoose.model('List',listSchema)


module.exports=List
