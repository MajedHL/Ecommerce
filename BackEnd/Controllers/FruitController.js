const Fruits=require('../Models/Fruits');
const Minio = require('minio');
const fs=require('fs');
const path=require('path');
const mongoose=require('mongoose');
const { resolve } = require('path');
const fsExtra=require('fs-extra')

class FruitController{


    static async getAll(req,res){
        try{
        let fruits= await Fruits.find().lean();
        let promises=[] 
        fruits.forEach( (fruit)=>{             
             promises.push(FruitController.GetImage(req,res,fruit.ref)); 
                 
        })
        
        Promise.all(promises).catch((err)=>{
            console.log("Error:",err);
            return promises;
        }).then((images)=>{            
            for(let i=0;i<images.length;i++){
                fruits[i]['image']=images[i];
            }
            return fruits;
        }).then((fruits)=>{
            console.log(fruits);
            return  res.status(200).json(fruits)
        }) 

        }catch(e){
            console.log(e.message);
            return res.status(500).send(e.message)
        }

    }


   

    static async add(req,res){
        console.log("post request add");
        let result=true;
        try{
            const {fruit:sentfruit}= req.body
            const {fruitTitle:title,fruitPrice:price_U,fruitStock:stocks}=JSON.parse(sentfruit)       
              
            let ref='';
            if(req.file) ref=req.file.filename
            else ref='fruits.jpg';
            console.log("ref:"+ref)
            const fruit={title,price_U,stocks,ref};
            await Fruits.create(fruit)
            result= await FruitController.UploadFIle(req,res)         
            console.log("result:"+result)
            if(result!==false) return res.status(201).json(fruit)
        
        }catch(e){
            console.log("The Error:",e);            
          if(e.code)  {if(e.code===11000) {res.status(403).send(e.message+", the title must be unique"); return;} }
         if(e.message) res.status(500).send(e.message)     
         const dirPath=path.resolve(__dirname,'..','temp/');
         CleansTemp(dirPath);
       
       
        } 
          
     }



     static async deleteAll(req,res){
        console.log("delete request")
       try{
        const fruits=await Fruits.deleteMany()  
        res.status(200).send("Deleted Succesfully");
       }catch(e){
           console.log(e.message);
       }    
    }
    
//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!AGAIN TRY ADDING A FRUIT WHEN MINION IS STOPPED!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

    static  UploadFIle(req,res){
        if(!req.file){
            res.status(200).send("No image was chosen so the fruit will have the default fruit image")
            return false
        }              

    const minioClient = new Minio.Client({
    endPoint: 'localhost',
    port: 9000,
    useSSL: false,
    accessKey: 'adminUser',
    secretKey: 'Passkey2001',
    });
    const bucketName = 'fruits';
    const file=req.file;
    let objectName=file.filename;
    const filepath=path.resolve(__dirname,'..','temp/'+objectName);    
       
   return new Promise((resolve,reject)=>{
    minioClient.fPutObject(bucketName, objectName, filepath, (error, etag) => {            
        if (error) {
          console.error('Error uploading file to MinIO:', error);
          res.status(500).json({ error: 'Error uploading the image, please try modifying the image later on' });              
          const err={code:error.code,message:"Error uploading the image"}         
        

          reject(err);
          return;
        }

        fs.unlink(filepath, (unlinkError) => {            
            if (unlinkError) {
              console.error('Error deleting temporary file:', unlinkError);                  
            }
            else console.error('File deleted successfully');
          });              
          resolve('success');  
          console.log('File uploaded successfully to MinIO'); 
        
      });
   }) ;
   
} 

    
      





static  GetImage(req, res, objectName) {
    const minioClient = new Minio.Client({
              endPoint: 'localhost',
              port: 9000,
              useSSL: false,
              accessKey: 'adminUser',
              secretKey: 'Passkey2001',
            });
            const bucketName = 'fruits';
            
     return new Promise((resolve,reject)=>{
        
            minioClient.presignedGetObject(bucketName, objectName, (err, presignedUrl) => {
                if (err) {
                  console.error('Error generating presigned URL:', err);
                 reject("Failed to fetch URL");
                return;
                }
                
               resolve(presignedUrl);   
              });        
        
     })       

}









static async  deleteById(req,res){
   console.log("delete by id")
    try{
        const id=req.params.id;   
        if(id){
            const fruit=await Fruits.deleteOne({_id:id})
            console.log(fruit)
            return res.status(200).json(fruit);
        }
        else return res.status(400).send("the requested fruit doesnt exist")
    }catch(e){
        if(e.message){
            console.log("Error:",e.message);
            return res.status(400).send(e.message)
        }
        
    }    

}


static async  getById(req,res){
    console.log("get by id")
     try{
         const id=req.params.id;   
         if(id){
             const fruit=await Fruits.find({_id:id})
             console.log(fruit)
             return res.status(200).json(fruit);
         }
         else return res.status(400).send("the requested fruit doesnt exist")
     }catch(e){
         if(e.message){
             console.log("Error:",e.message);
             return res.status(400).send(e.message)
         }
         
     }      
 
 }


}


function CleansTemp(dirPath){
    fsExtra.emptyDir(dirPath,err => {
        if(err){
            console.log(err);
            return;
        }
        console.log('All files deleted from directory Successfully.');
    })
}

module.exports=FruitController