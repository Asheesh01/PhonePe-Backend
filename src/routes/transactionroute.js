const express=require("express")
const router=express.Router();
const authMiddleware=require('../middleware/authMiddleware')
const {sendMoney,getTransactionHistory,getMoney}=require('../controller/transactionController')
router.post('/send',authMiddleware,sendMoney)
router.get('/Transaction',authMiddleware,getTransactionHistory)
router.get('/deposit',authMiddleware,getMoney)
module.exports=router;