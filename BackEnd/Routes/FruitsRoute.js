const express=require('express');
const path = require('path');
const FruitController=require('../Controllers/FruitController')
const router=express.Router();
const fs=require('fs')
const multer = require('multer');
const { v4: uuidv4 } = require('uuid');

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

router.get('/',FruitController.getAll)
router.get('/:id',FruitController.getById)
router.post('/',upload,FruitController.add)
router.delete('/',FruitController.deleteAll)
router.get('/imgs',FruitController.GetImage)
router.delete('/:id',FruitController.deleteById)



module.exports={router}