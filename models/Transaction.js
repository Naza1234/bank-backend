const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
    transactionName: { type: String, required: true }, // New field
    type: { type: String, required: true }, // Sender or Receiver
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: false },
    dateTransaction: { type: String, required: false },
    currentAccountBalance: { type: Number, required: true },
    amount: { type: Number, required: true },
    transactionType: { type: String, enum: ['debit', 'credit'], required: true },
    status: { type: String, enum: ['pending', 'approved','hold'], default: 'pending' }
}, { timestamps: true });

const Transaction = mongoose.model('Transaction', transactionSchema);

module.exports = Transaction;
