const Users=require('../Models/Users')
const Carts=require('../Models/Carts')
const crypto=require('crypto');
const UsersController=require('./UsersController')
class AuthController{

    static activeSessions=[]; 

    static async login(req,res){
        
        try{
            const {userName, password}=req.body;
            const user= await Users.findOne({userName:userName, password:password})           
     
     
             if(user) {
               req.session.userId=user._id;
               console.log("userId:",req.session.userId)
               const obj=req.session;
               const { _id, userName, email, role, access_key}=user
               return res.status(200).send({ _id, userName, email, role, access_key})}
             else return res.status(401).send('Invalid credentials')
        }
        catch(e){
            console.log(e.message)
            res.status(400).send(e.message)
        }              

    }


    
    static async logOut(req,res){
        
        try{                   
            req.session.destroy((err) => {
                if (err) {
                  console.error('Error destroying session:', err);
                  res.status(500).send('Error destroying session');
                } else {
                  console.log('Session destroyed');
                  res.status(200).send('Session destroyed');
                }               
              });              
            
        }
        catch(e){
            console.log(e.message)
            res.status(400).send(e.message)
        }              

    }







// equivalent to add a user (client)
    static async signUp(req,res){        
        try{


            
            
            const {userName, password, email}=req.body;
            const userMatch= await Users.findOne({$or:[{userName:userName}, {email:email}]})           
     
             if(userMatch) {
              return res.status(400).send('Account already exists')
            }
            const token=crypto.randomBytes(32).toString('hex'); 
            
            const createdUser= await Users.create({...req.body,role:"client",access_key:token})            
            const createdCart= await Carts.create({userId:createdUser._id, items:[]})         
            
    

            if(!createdCart) return res.status(500).send('Error creating Cart')
            if(!createdUser) return res.status(500).send('Error creating User')

             req.session.userId=createdUser._id;
             return res.status(200).send('User created and Cart initialiazed')
        }
        catch(e){
            console.log(e.message)
            res.status(400).send(e.message)
        }      
     }


    
    
    
    

}

module.exports=AuthController