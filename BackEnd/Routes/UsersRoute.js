
const {UsersController}=require('../Controllers/UsersController.js')
const express=require('express');
const router=express.Router()

router.get('/', UsersController.getUser)
router.get('/all', UsersController.getAll)
router.delete('/', UsersController.deleteAll)
router.delete('/:id', UsersController.deleteById)

module.exports={router};