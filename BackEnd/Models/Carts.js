const mongoose=require('mongoose');

const CartSchema=new mongoose.Schema({
    userId:{
        type:mongoose.SchemaTypes.ObjectId,
        ref:'Users', 
        unique:true,
        required:true,       
    },
    items:{
        type:[{
        productId:{
        type:mongoose.SchemaTypes.ObjectId,
        ref:'Products',       
        },            
        quantity:Number,        
        }],
        required:false,
    },
},
{   required:true,
    strict:'throw',

})
const Carts=mongoose.model('Carts',CartSchema);
Carts.createIndexes();
module.exports=Carts