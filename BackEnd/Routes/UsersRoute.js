
const {UserController}=require('../Controllers/UserController.js')
const express=require('express');
const router=express.Router()

router.post('/',UserController.add)
router.get('/',UserController.getAll)
router.delete('/',UserController.deleteAll)

module.exports={router};