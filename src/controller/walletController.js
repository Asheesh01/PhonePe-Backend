const User=require('../models/User')
const payBill=async(req,res)=>{

}

const withDraw=async(req,res)=>{
    const userId=req.user.id;
    const user=await User.findById(userId);
}
module.exports={
    payBill,
    withDraw
}