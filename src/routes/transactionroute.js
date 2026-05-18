const express=require("express")
const router=express.Router();
const authMiddleware=require('../middleware/authMiddleware')
const {sendMoney,getTransactionHistory,addMoney,checkAmount}=require('../controller/transactionController')
router.post('/send',authMiddleware,sendMoney)
router.get('/Transaction',authMiddleware,getTransactionHistory)
router.get('/deposit',authMiddleware,addMoney)
router.get('/checkbalance',authMiddleware,checkAmount)


module.exports=router;