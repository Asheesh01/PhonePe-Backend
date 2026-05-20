const express=require('express');
const router=express.Router()

const authMiddleware=require("../middleware/authMiddleware")
const{payBill,withDraw}=require('../controller/walletController')
router.post('paybill',authMiddleware,payBill);
router.get('/withdraw',authMiddleware,withDraw);
module.exports=router;