const express=require('express');
const router=express.Router();
const CartsController=require('../Controllers/CartsController')
const Authentication=require('../Midellwares/Authentication')

router.get('/', Authentication,CartsController.getCart)
router.get('/all', CartsController.getAll)  //for admins
router.get('/:id', CartsController.getbyId) // for admins
router.get('user/:userId', CartsController.getbyUserId) //for admins
router.post('/', CartsController.addCart) // useless, could be deleted
router.delete('/', CartsController.deleteAll)
router.put('/:id', CartsController.modifyCart)



module.exports={router}