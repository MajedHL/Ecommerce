const mongoose=require('mongoose');
const UserSchema=new mongoose.Schema({
    login:{
        type:String,
        unique:true,
        
    },
    password:String,
    email:{
        type:String,
        unique:true,
        
    },
    role:String,
    access_key:{
        type:mongoose.SchemaTypes.Mixed,
        required:false,
    }
},
{
    strict:'throw',
    required:true,
})

const User=mongoose.model('User',UserSchema);


module.exports=User;