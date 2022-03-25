const mongoose=require('mongoose')
const bcrypt = require('bcrypt-nodejs')
const userSchema= new mongoose.Schema({
    email:{
        type:String,
        require:true
    },
    password:{
        type:String,
        require:true
    }
})

userSchema.methods.hashPassword = (password)=>{
    return bcrypt.hashSync(password,bcrypt.genSaltSync(10))
}
userSchema.methods.comparePasswords =(password,hash)=>{
    return bcrypt.compareSync(password,hash)
}
let User=mongoose.model('User',userSchema,'user')


module.exports=User