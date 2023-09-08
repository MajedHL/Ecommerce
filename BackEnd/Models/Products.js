const mongoose=require('mongoose');

const ProductsSchema=new mongoose.Schema({

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
 categorie:{
     type: String,
     required: false,     
     },
ref:String

},{
    strict:'throw',
    required:true,
})

module.exports=mongoose.model('Products',ProductsSchema);