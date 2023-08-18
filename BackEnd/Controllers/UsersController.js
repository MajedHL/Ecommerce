const Users=require('../Models/Users');
class UsersController{

    
    
    
    static async getUser(req,res){
        console.log("getUser request")
        const id=req.session.userId;
       console.log("id:", id)
        try{
        const user=await Users.findOne({_id:id})    
        console.log("found user:",user)
        res.json(user);
       }catch(e){
        console.log(e.message);
       }    
    }


     static async getAll(req,res){
         console.log("get request")
        try{
         const users=await Users.find()    
        console.log(users)
        res.json(users);
        }catch(e){
            console.log(e.message);
        }    
     }


     static async deleteAll(req,res){
        console.log("delete request")
       try{
        const users=await Users.deleteMany()  
        res.status(200).send("Deleted Succesfully");
       }catch(e){
           console.log(e.message);
       }    
    }

    
    static async deleteById(req,res){
        console.log("delete request")
        const id=req.params.id;
       try{
        const resp=await Users.deleteOne({_id:id})  
         res.status(200).send(resp);
        
       }catch(e){
           console.log(e.message);
           res.status(400).send(e.message);
       }    
    }


}

module.exports={UsersController}
