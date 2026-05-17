const { use } = require('react');
const transacrion = require('../models/transactionModel')
const user = require('../models/User')
const bcrypt = require('bcryptjs');
const Transaction = require('../models/transactionModel');
const sendMoney = async (req, res) => {
    try {
        const { phone, mpin, amount } = req.body;
        const senderId = req.user._id;

        if (!mpin) {
            return res.status(400).json({
                message: "MPIN is required"
            })
        }
        if (amoun <= 0) {
            return res.status(400).json({
                message: "Amount must be greter than zero"
            })
        }

        const sender = await user.findById(senderId);
        if (!sender) {
            return res.status(500).json({
                message: "sender not found"
            })
        }

        const isMpinmatch = await bcrypt.compare(mpin, sender.mpin);
        if(!isMpinmatch){
            return res.status(400).json({
                message:"Mpin Is Incorrect"
            })
        }
        const reciever=await user.findOne({phone});
        if(!reciever){
            return res.status(400).json({
                message:"recieve is not found"
            })
        }
        if(sender.balance < amount){
            return res.status(400).json({
                message:"Insufficient balance"
            })
        }
        sender.balance-=amount;
        reciever.balance+=amount;

        await sender.save();
        await reciever.save()

        const transaction=await Transaction.create({
            sender:sender._id,
             reciever:reciever._id,
             amount,
             types:'TRANSFER',
             status:'COMPLETED'
        });
        res.json({
            message:"Money sent successfully",transacrion
        })
    } catch (error) {
        res.status(500).json({
            message:error.message
        })
    }


}
const getTransactionHistory = async (req, res) => {

}

const getMoney = async (req, res) => {

}

module.exports = {
    sendMoney,
    getTransactionHistory,
    getMoney
}