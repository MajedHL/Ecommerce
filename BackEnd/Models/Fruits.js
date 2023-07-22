const mongoose=require('mongoose');

const FruitsSchema=new mongoose.Schema({

title:{
    type:String,
    unique:true,
},
price_U:Number,
stocks:Number,
ref:String

},{
    strict:'throw',
    required:true,
})

module.exports=mongoose.model('Fruits',FruitsSchema);