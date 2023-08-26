const Users=require('../Models/Users')

async function authentication(req,res,next){
    
    if(req.perm!=='none'){
        const id=req.session.userId 
        const access_key=req.header('Authorization')?.replace('Bearer ', '');
        
        if(!id && !access_key){
            return res.status(401).send("Please Login or use you're access key")
        }
    
        if(id){
        const user=await Users.findOne({_id:id });    
        req.user=user;
        if(!user) return res.status(401).send('Invalid user Id, Please login first')
    }
    
        
        if(access_key){
           const user=await Users.findOne({access_key:access_key}) // find the user using his token        
           req.user=user; 
           if(!user) return res.status(401).send('Invalid access key')
        }        
        next();
        
    }else next();
    
}


module.exports=authentication;