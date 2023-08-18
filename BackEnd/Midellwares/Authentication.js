const Users=require('../Models/Users')

async function authentication(req,res,next){
    const id=req.session.userId 
    const access_key=req.header('Authorization')?.replace('Bearer ', '');
    
    if(!id && !access_key){
        return res.status(401).send("Please Login or use you're access key")
    }

    if(id){
    const user=await Users.findOne({_id:id });    
    if(!user) return res.status(401).send('Invalid user Id, Please login first')
}

    
    if(access_key){
       const user=await Users.findOne({access_key:access_key}) // find the user using his token        
        if(!user) return res.status(401).send('Invalid access key')
    }

    next();
}


module.exports=authentication;