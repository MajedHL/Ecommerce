const mongoose=require('mongoose');

const FruitsSchema=new mongoose.Schema({

title:{
    type:String,
    unique:true,
    required:true,
},
price_U:{
   type:Number,
   required:true,
},
stocks:{
    type:Number,
    required:true,
 },
ref:String

},{
    strict:'throw',
    required:true,
})

module.exports=mongoose.model('Fruits',FruitsSchema);