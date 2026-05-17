const express=require("express")
const router=express.Router();
const authMiddleware=require('../middleware/authMiddleware')
const {sendMoney,getTransactionHistory,addMoney}=require('../controller/transactionController')
router.post('/send',authMiddleware,sendMoney)
router.get('/Transaction',authMiddleware,getTransactionHistory)
router.get('/deposit',authMiddleware,addMoney)
module.exports=router;