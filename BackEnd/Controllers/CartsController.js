const Carts=require('../Models/Carts');
const Users=require('../Models/Users');
const ObjectId = require('mongoose').Types.ObjectId;

class CartsController{

    // for admins
    static async getAll(req,res){
        try{
            const carts=await Carts.find();           
            return res.status(200).json(carts)

        }catch(e){
            console.log(e.message)
            res.status(400).send(e.message)
        }        

    }

    // for admins
    static async getbyId(req,res){
        try{
            const id=req.params.id
            const cart=await Carts.findOne({_id:id});
            return res.status(200).json(cart)

        }catch(e){
            console.log(e.message)
            res.status(400).send(e.message)
        }        

    }


    // for admins
    static async getbyUserId(req,res){
        try{
            const id=req.params.userId
            const cart=await Carts.findOne({userId:id});
            return res.status(200).json(cart)

        }catch(e){
            console.log(e.message)
            res.status(400).send(e.message)
        }        

    }



    static async getCart(req,res){
        try{
            const id=req.session.userId 
            if(id){
                const cart=await Carts.findOne({userId:id }).populate('items.productId').exec();       
                return res.status(200).json(cart)                   
        }

            const access_key=req.header('Authorization')?.replace('Bearer ', '');
            if(access_key){
                const user=await Users.findOne({access_key:access_key}) // find the user using his token
                const cart=await Carts.findOne({userId:user._id}).populate('items.productId').exec();// then find his cart
                return res.status(200).json(cart)
            }

        }catch(e){
            console.log(e.message)
            res.status(400).send(e.message)
        }        

    }

    //  useless                                 
    static async addCart(req,res){
        try{//req.body is the user id when initiliazing the Cart
            const cart=req.body
            const result= await Carts.create(cart)          
            res.status(201).json(result)
        }catch(e){
            console.log(e.message)
            res.status(400).send(e.message)
        }
    }







    static async modifyCart(req,res){
        try{
            const id=req.params.id;
            const newCart=req.body;// new array of itmes          
           
            const Cart=await Carts.findOne({_id:id});
            //extract the list of ids and quantities, items is a list of ids and quantities not the populated objects             
            const newItems=newCart.items.map((item)=>{return {productId:item.productId._id, quantity:item.quantity}})           
            Cart.items=newItems;
            await Cart.save();
            res.status(200).send('Updated succesfully');

        }catch(e){
            console.log(e.message);
            res.status(400).send(e.message)
        }

    }




    static async deleteAll(req,res){        
       try{
        const carts=await Carts.deleteMany()  
        res.status(200).send("Deleted Succesfully");
       }catch(e){
           console.log(e.message);
           res.status(400).send(e.message)
       }    
    }





}


module.exports=CartsController