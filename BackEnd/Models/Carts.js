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
        ref:'Fruits',       
        },            
        quantity:Number,        
        }],
        required:false,
    },
},
{   required:true,
    strict:'throw',

})
CartSchema.index({userId:1,"items.productId":1})// productId must be unique within the items list
const Carts=mongoose.model('Carts',CartSchema);
Carts.createIndexes();
module.exports=Carts