const Categories=require('../Models/Categories')
const {minioClient}=require('../config')
const fs=require('fs');
const path=require('path');
const mongoose=require('mongoose')

const DONTSEND = "dontSend";
class CategoriesController{

    static async getAll(req,res){
        try{             
            const categories=await Categories.find().lean();
            let promises=[];
            categories.forEach( (categorie)=>{promises.push(GetImage(categorie.ref))})            
            let images=await Promise.all(promises)          
           
            for(let i=0;i<images.length;i++){
                categories[i]['image']=images[i];
            }                      
            res.status(200).json(categories)

        }catch(e){
            console.log(e.message)
            res.status(400).send(e.message)
        }

    }   



    static async  add(req,res){
        let resp1
        let resp2;

        try{            
            const {title}= req.body;
            const newCategorie={};
            newCategorie.title=title
            newCategorie.ref='products.png';
            
            if(req.file) newCategorie.ref=req.file.filename          
            
             
                // operations
                resp1= await Categories.create(newCategorie)                
                resp2 = await UploadFIle(req,res)              
                              
             if(resp2!==DONTSEND) res.status(201).json(newCategorie)

        }catch(e){            
            if(resp1 && !resp2){
                // op1 success and op2 failed => abort op1                
                let deleted=await Categories.deleteOne({_id:resp1._id})
                console.log('delteonOp:',deleted)
            }
            
            res.status(400).send(e.message)
        }

    }

}




function UploadFIle(req,res){
    if(!req.file){
        const resp = "No image was chosen so this product categorie will have the default product image";
        res.status(200).send(resp)
        return DONTSEND;
    }        
    const bucketName = 'products';
    const file=req.file;
    let objectName=file.filename;
    const filepath=path.resolve(__dirname,'..','temp/'+objectName);    
       
   return new Promise((resolve,reject)=>{
    minioClient.fPutObject(bucketName, objectName, filepath, (error, etag) => {            
        if (error) {
          console.error('Error uploading file to MinIO:', error);
        //   res.status(500).json({ error: 'Error uploading the image, please try modifying the image later on' });              
          const err={code:error.code,message:"Error uploading the image, please try modifying the image later on"}        
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


 function GetImage(objectName) {   
    const bucketName = 'products';            
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

module.exports=CategoriesController;