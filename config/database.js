const mongoose=require('mongoose')

mongoose.connect('mongodb://localhost:27017/listsDB',(err)=>{
    if(err){
        console.log(err);
    }
    else{
        console.log('connected to db successfuly');
    }
})


