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
    }
})

const Transaction=new mongoose.model('Transaction',transactionSchema);
module.exports=Transaction;