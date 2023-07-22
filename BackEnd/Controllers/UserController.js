const User=require('../Models/User');
class UserController{

    
    
    static async add(req,res){
        console.log("post request");
        try{
         const user=req.body   
         await User.create(user)    
         return res.status(201).json(user)
        }catch(e){
            console.log(e.message);
          if(e.message)  res.status(400).send(e.message)
        }    
     }



     static async getAll(req,res){
         console.log("get request")
        try{
         const users=await User.find()    
        console.log(users)
        res.json(users);
        }catch(e){
            console.log(e.message);
        }    
     }


     static async deleteAll(req,res){
        console.log("delete request")
       try{
        const users=await User.deleteMany()  
        res.status(200).send("Deleted Succesfully");
       }catch(e){
           console.log(e.message);
       }    
    }


}

module.exports={UserController}
