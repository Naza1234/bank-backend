const Transaction = require('../models/Transaction');
const User = require('../models/User');

// Create a new transaction
exports.createTransaction = async (req, res) => {
    const { transactionName, type, dateTransaction, userId, currentAccountBalance, amount, transactionType, status } = req.body;

    try {
        // Create a new transaction
        const transaction = new Transaction({
            transactionName,  // New field added here
            type,
            dateTransaction,
            userId,
            currentAccountBalance,
            amount,
            transactionType,
            status
        });

        // Save the transaction to the database
        await transaction.save();

  
        res.status(201).json({
            message: 'Transaction created successfully',
            transaction
        });
    } catch (error) {
        res.status(500).json({ message: 'Error creating transaction', error });
    }
};

// Get all transactions for a specific user
exports.getTransactionsByUser = async (req, res) => {
    const { userId } = req.params;

    try {
        const transactions = await Transaction.find({ userId });

        if (!transactions || transactions.length === 0) {
            return res.status(404).json({ message: 'No transactions found for this user' });
        }

        res.status(200).json({
            message: 'Transactions retrieved successfully',
            transactions
        });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

// Get a specific transaction by ID
exports.getTransactionById = async (req, res) => {
    const { transactionId } = req.params;

    try {
        const transaction = await Transaction.findById(transactionId);

        if (!transaction) {
            return res.status(404).json({ message: 'Transaction not found' });
        }

        res.status(200).json({
            message: 'Transaction retrieved successfully',
            transaction
        });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

// Update a specific transaction by ID
exports.updateTransactionById = async (req, res) => {
    const { transactionId } = req.params;
    const { transactionName, type, userId, currentAccountBalance, amount, transactionType, status } = req.body;

    try {
        const transaction = await Transaction.findById(transactionId);

        if (!transaction) {
            return res.status(404).json({ message: 'Transaction not found' });
        }

        // Update the transaction fields
        transaction.transactionName = transactionName || transaction.transactionName; // Update transactionName
        transaction.type = type || transaction.type;
        transaction.dateTransaction =  dateTransaction || transaction.dateTransaction;
        transaction.userId = userId || transaction.userId;
        transaction.currentAccountBalance = currentAccountBalance || transaction.currentAccountBalance;
        transaction.amount = amount || transaction.amount;
        transaction.transactionType = transactionType || transaction.transactionType;
        transaction.status = status || transaction.status;

        // Save the updated transaction
        await transaction.save();

        res.status(200).json({
            message: 'Transaction updated successfully',
            transaction
        });
    } catch (error) {
        res.status(500).json({ message: 'Error updating transaction', error });
    }
};

// Delete a specific transaction by ID
exports.deleteTransactionById = async (req, res) => {
    const { transactionId } = req.params;

    try {
        const transaction = await Transaction.findById(transactionId);

        if (!transaction) {
            return res.status(404).json({ message: 'Transaction not found' });
        }

        await Transaction.deleteOne({ _id: transactionId });

        res.status(200).json({
            message: 'Transaction deleted successfully',
            transactionId
        });
      
    } catch (error) {
        res.status(500).json({ message: 'Error deleting transaction', error });
    }
};

