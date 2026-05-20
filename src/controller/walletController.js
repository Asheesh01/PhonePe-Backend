const Transaction = require('../models/transactionModel');
const User = require('../models/User')
const bcrypt=require('bcryptjs')
const withDraw = async (req, res) => {
    try {
        const { amount, mpin } = req.body;
        const userId = req.user.id;
        const user = await User.findById(userId);
        if (!mpin || !amount) {
            return res.status(500).json({
                message: "Please provide all the required fields"
            })
        }
        if (amount > user.balance) {
            return res.status(500).json({
                message: "Insufficient balance"
            })
        }
        const verifyMpin = await bcrypt.compare(mpin, user.mpin);
        if (!verifyMpin) {
            return res.status(500).json({
                message: "mpin is incorrect"
            })
        }
        user.balance -= amount;
        await user.save();
        const transaction = await Transaction.create({
            sender: user._id,
            reciever: user._id,
            amount,
            balance: user.balance,
            types: 'DEPOSIT',
            status: 'COMPLETED'
        })
        res.json({
            message: "Amount debited from your account successfully",
            transaction
        })

    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}
module.exports = {
    withDraw
}