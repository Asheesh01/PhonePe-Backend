const express=require("express")
const router=express.Router();
const authMiddeleware=require('../middleware/authMiddleware')
const {registerUser,loginUser,setupMpin, getUserProfile}=require('../controller/authController')
 router.post('/register',registerUser)
 router.post('/login',loginUser)
  router.post('/set-mpin',authMiddeleware,setupMpin)
   router.post('/profile',authMiddeleware,getUserProfile)

 module.exports=router;