const express=require('express');
const router=express.Router()
const authMiddleware=require("../middleware/authMiddleware")
const{withDraw}=require('../controller/walletController')
router.get('/withdraw',authMiddleware,withDraw);
module.exports=router;