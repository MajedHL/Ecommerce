const Users=require('../Models/Users');
class UsersController{

    
    
    
    static async getUser(req,res){        
        const id=req.session.userId;      
        try{
        const user=await Users.findOne({_id:id})  
        res.json(user);
       }catch(e){
        console.log(e.message);
       }    
    }


     static async getAll(req,res){        
        try{
         const users=await Users.find()   
        res.json(users);
        }catch(e){
            console.log(e.message);
        }    
     }


     static async deleteAll(req,res){       
       try{
        const users=await Users.deleteMany()  
        res.status(200).send("Deleted Succesfully");
       }catch(e){
           console.log(e.message);
       }    
    }

    
    static async deleteById(req,res){       
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
