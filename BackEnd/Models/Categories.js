const mongoose=require('mongoose');

const CategoriesSchema=new mongoose.Schema({
    title:{
        type:String,
        unique:true,
        required:true,
        lowercase:true,
    },
    ref:String
},
{
    strict:'throw',
    required:true,
})

const Categories=new mongoose.model('Categories',CategoriesSchema);

module.exports=Categories;