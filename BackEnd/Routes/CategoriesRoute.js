const express=require('express');
const path = require('path');
const CategoriesController=require('../Controllers/CategoriesController')
const router=express.Router();
const fs=require('fs')
const multer = require('multer');
const { v4: uuidv4 } = require('uuid');
const combinedMiddlewares=require('../Middelwares/Combination')
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const tempFolderPath = path.resolve( __dirname,'..', 'temp');
        
        fs.mkdirSync(tempFolderPath, { recursive: true }); // Create the temp folder if it doesn't exist
        cb(null, tempFolderPath);
      },
  filename: (req, file, cb) => {       
    if(file) cb(null, uuidv4()+file.originalname);
    else cb(null, "empty")
  },
});
const upload = multer({ storage }).single('file');


router.get('/all', combinedMiddlewares,CategoriesController.getAll) // none 
// router.get('/:id', combinedMiddlewares, TypesController.getById) // none 
 router.post('/', combinedMiddlewares, upload, CategoriesController.add) // admins
// router.delete('/', combinedMiddlewares, TypesController.deleteAll) // admins
// router.delete('/:id', combinedMiddlewares, TypesController.deleteById) // admins



module.exports={router}