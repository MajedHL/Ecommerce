const express=require('express');
const router=express.Router();
const AuthController= require('../Controllers/AuthController')

router.post('/signUp', AuthController.signUp)
router.post('/login', AuthController.login )
router.post('/logOut', AuthController.logOut)

module.exports={router};