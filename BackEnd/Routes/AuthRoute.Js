const express=require('express');
const router=express.Router();
const AuthController= require('../Controllers/AuthController')


router.post('/signUp', AuthController.signUp) //none
router.post('/login', AuthController.login ) //none
router.post('/logOut', AuthController.logOut) // none

module.exports={router};