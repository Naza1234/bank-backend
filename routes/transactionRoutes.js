const express = require('express');
const router = express.Router();
const transactionController = require('../controllers/transactionController');

// Create a new transaction
router.post('/transactions', transactionController.createTransaction);

// Get all transactions for a user
router.get('/transactions/:userId', transactionController.getTransactionsByUser);

// Get a specific transaction by ID
router.get('/transactions/transactions/:transactionId', transactionController.getTransactionById);

// Update a specific transaction by ID
router.put('/transactions/:transactionId', transactionController.updateTransactionById);

// Delete a specific transaction by ID
router.delete('/transactions/:transactionId', transactionController.deleteTransactionById);

module.exports = router;
