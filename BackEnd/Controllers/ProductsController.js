const Products=require('../Models/Products');
// const Minio = require('minio');
const {minioClient}=require('../config')
const fs=require('fs');
const path=require('path');
const mongoose=require('mongoose');
const { resolve } = require('path');
const fsExtra=require('fs-extra')

class ProductsController{


    static async getAll(req,res){
        try{ 
                        
        let products= await Products.find().lean();
        let promises=[] 
        products.forEach( (product)=>{             
             promises.push(ProductsController.GetImage(req,res,product.ref)); 
                 
        })
        
        Promise.all(promises).catch((err)=>{
            console.log("Error:",err);
            return promises;
        }).then((images)=>{            
            for(let i=0;i<images.length;i++){
                products[i]['image']=images[i];
            }
            return products;
        }).then((products)=>{            
            return  res.status(200).json(products)
        }) 

        }catch(e){
            console.log(e.message);
            return res.status(500).send(e.message)
        }

    }


   

    static async add(req,res){        
        let result=true;
        try{
            const {product:sentproduct}= req.body
            const {productTitle:title,productPrice:price_U,productStock:stocks,productCategorie:categorie}=JSON.parse(sentproduct)      
                      
            let ref='';
            if(req.file) ref=req.file.filename
            //FIX ME
            else ref='products.png'            
            const product={title,price_U,stocks,categorie,ref};
            await Products.create(product)
            result = await ProductsController.UploadFIle(req,res)        
            if(result!==false) return res.status(201).json(product)
        
        }catch(e){
            console.log("The Error:",e);            
            if(e.code)  {if(e.code===11000) {res.status(403).send(e.message+", the title must be unique"); return;} }
            if(e.message) res.status(500).send(e.message)     
            const dirPath=path.resolve(__dirname,'..','temp/');
            CleansTemp(dirPath);      
       
        } 
          
     }



     static async deleteAll(req,res){       
       try{
        const response=await Products.deleteMany()  
        res.status(200).send("Deleted Succesfully");
       }catch(e){
           console.log(e.message);
       }    
    }
    


    static  UploadFIle(req,res){
    if(!req.file){
        res.status(200).send("No image was chosen so the product will have the default product image")
        return false
    }        
    const bucketName = 'products';
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









static async  deleteById(req,res){  
    try{
        const id=req.params.id;   
        if(id){                             
                                        
            const product=await Products.findOneAndDelete({_id:id})
            //FIXE ME: add other default types images
            if(product.ref!=="products.png"){
                const removeResp= await RemoveImage('products',product.ref) 
                console.log("removeResp:",removeResp)}            
                return res.status(200).json(product);
        }
        else return res.status(400).send("the requested product doesnt exist")
    }catch(e){
        if(e.message){
            console.log("Error:",e.message);
            return res.status(400).send(e.message)
        }
        
    }    

}


static async  getById(req,res){   
     try{
         const id=req.params.id;   
         if(id){
             const product=await Products.findOne({_id:id})             
             return res.status(200).json(product);
         }
         else return res.status(400).send("the requested product doesnt exist")
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


function RemoveImage(bucketName,imageName) {
   return new Promise((resolve, reject)=>{
    minioClient.removeObject(bucketName, imageName, function(err) {
        if (err) {
            reject('Failed to remove image');
            return console.log('Unable to remove object', err)
        }
        resolve(true);
        console.log('Removed the object')
      })
   }); 
}

module.exports=ProductsController