const express=require('express');
const mongoose=require('mongoose');
const {router}=require('./Routes/UsersRoute');
const { router : fruitsRouter}=require('./Routes/FruitsRoute');

 mongoose.connect('mongodb://localhost:27017/')
.catch(error => console.log('Connection Error:'+error));





const app=express();


const cors=require('cors');
app.use(cors());
app.use(express.json());
app.use('/users',router)
app.use('/fruits',fruitsRouter)


app.listen(5000,()=>{
    console.log("server listening on port 5000")
})
module.exports={app};

