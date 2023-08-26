

 function authorization(req,res,next){
    const user=req.user
    const perm=req.perm
    
    if(perm!=='none'){
        if(!user) return res.status(400).send('User not found');
        console.log("user on req:", user);    
        if(user.role===perm || user.role==='admin') next();
        else return res.status(401).send("you dont have the permissions to perform this action")
    }else next();
}


module.exports=authorization