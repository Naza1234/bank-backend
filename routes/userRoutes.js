const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.post('/users', userController.createUser);       // Create a new user
router.get('/users', userController.getAllUsers);       // Get all users
router.get('/users/:userId', userController.getUserById);   // Get specific user data
router.put('/users/:id', userController.updateUser);    // Update user by ID
router.delete('/users/:id', userController.deleteUser); // Delete user by ID
router.post('/login', userController.loginUser);        // User login

module.exports = router;
