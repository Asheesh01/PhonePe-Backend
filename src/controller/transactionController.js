const transacrion = require('../models/transactionModel')
const User = require('../models/User')
const bcrypt = require('bcryptjs');
const Transaction = require('../models/transactionModel');
const sendMoney = async (req, res) => {
    try {
        const { phone, mpin, amount } = req.body;
        const senderId = req.user.id;
        console.log(req.body);
        if (!mpin) {
            return res.status(400).json({
                message: "MPIN is required"
            })
        }
        if (amount <= 0) {
            return res.status(400).json({
                message: "Amount must be greter than zero"
            })
        }
        const sender = await User.findById(senderId);
        if (!sender) {
            return res.status(500).json({
                message: "sender not found"
            })
        }
        const isMpinmatch = await bcrypt.compare(mpin, sender.mpin);
        if (!isMpinmatch) {
            return res.status(400).json({
                message: "Mpin Is Incorrect"
            })
        }
        const reciever = await User.findOne({ phone });
        if (!reciever) {
            return res.status(400).json({
                message: "recieve is not found"
            })
        }
        if (sender.balance < amount) {
            return res.status(400).json({
                message: "Insufficient balance"
            })
        }
        sender.balance -= amount;
        reciever.balance += amount;
        await sender.save();
        await reciever.save()
        const transaction = await Transaction.create({
            sender: sender._id,
            reciever: reciever._id,
            amount,
            types: 'TRANSFER',
            status: 'COMPLETED'
        });
        res.json({
            message: "Money sent successfully", transacrion
        })
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}
const getTransactionHistory = async (req, res) => {
    try {
        const userID = req.user._id;
        const transaction = await Transaction.find({
            $or: [{ sender: userID }, { reciever: senderId }]
        }).populate('sender', 'name email phone').populate('reciever', 'name email phone')
            .sort({ timestamp: -1 });
        res.json({ transacrion });
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}
const addMoney = async (req, res) => {
    try {
        const {amount, mpin }=req.body;
    const userId = req.user.id;
    const user=await User.findById(userId);
    if (!user) {
        return res.status(400).json({
            message: "Invalid User"
        })
    }
    const verifympn = await bcrypt.compare(mpin, user.mpin);
    if (!verifympn) {
        return res.status(400).json({
            message: "Incorrect Mpin"
        })
    }
    user.balance += amount;
    const transaction = await Transaction.create({
        sender: user._id,
        amount,
        types: 'TRANSFER',
        status: 'COMPLETED'
    })
    res.json({
        message: "amount added to your accunt", transaction
    })
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}
module.exports = {
    sendMoney,
    getTransactionHistory,
    addMoney
}