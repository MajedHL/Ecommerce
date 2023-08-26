
const {UsersController}=require('../Controllers/UsersController.js')
const combinedMiddlewares=require('../Middelwares/Combination')
const express=require('express');
const router=express.Router()

router.get('/', combinedMiddlewares, UsersController.getUser) //client
router.get('/all', combinedMiddlewares, UsersController.getAll) //admins
router.delete('/', combinedMiddlewares, UsersController.deleteAll) //admins
router.delete('/:id', combinedMiddlewares, UsersController.deleteById) //admins

module.exports={router};