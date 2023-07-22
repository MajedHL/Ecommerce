const mongoose=require('mongoose');

const CartSchema=new mongoose.Schema({
    user:{
        type:mongoose.SchemaTypes.ObjectId,
        ref:'User'
    },
    items:[{
        title:String,
        price:Number,
        quantity:Number,
        image:String
    }]
})

module.exports=mongoose.model('Cart',CartSchema);