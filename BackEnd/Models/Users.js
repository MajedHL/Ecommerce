const mongoose=require('mongoose');
const UserSchema=new mongoose.Schema({
    userName:{
        type:String,
        unique:true,
        required:true,
    },
    password:{
        type:String,        
        required:true,
    },
    email:{
        type:String,
        unique:true,
        required:true,
    },
    role:String,
    access_key:{
        type:mongoose.SchemaTypes.Mixed,
        required:false,
        unique:true,
    }
},
{
    strict:'throw',
    required:true,
})

const Users=mongoose.model('Users',UserSchema);


module.exports=Users;