const mongoose=require('mongoose')

const transactionSchema=new mongoose.Schema({
    sender:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
    },
     sender:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
    },
    amount:{
        type:Number,
        required:true
    },
    billerName:{
        type:String,
        required:false
    },
    types:{
        type:String,
        enum:['TRANSFER','ADDMONEY','BILLPAYMENT','WITHDRAWL','DEPOSIT'],
        required:true
    },
    status:{
        type:String,
        enum:['PENDING','FAILED','COMPLETED'],
        default:'PENDING'
    },
    timestamp:{
        type:Date,
        default:Date.now
    }
})

const Transaction=new mongoose.model('Transaction',transactionSchema);
module.exports=Transaction;