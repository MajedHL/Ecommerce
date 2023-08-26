const express=require('express');
const router=express.Router();
const CartsController=require('../Controllers/CartsController')
const combinedMiddlewares=require('../Middelwares/Combination')

router.get('/', combinedMiddlewares, CartsController.getCart) // client = client+admins
router.get('/all', combinedMiddlewares, CartsController.getAll)  // admins
router.get('/:id', combinedMiddlewares, CartsController.getbyId) //  admins
router.get('user/:userId', combinedMiddlewares, CartsController.getbyUserId) // admins
router.delete('/', combinedMiddlewares, CartsController.deleteAll) // admins
router.put('/:id', combinedMiddlewares, CartsController.modifyCart) // client = client+admins



module.exports={router}