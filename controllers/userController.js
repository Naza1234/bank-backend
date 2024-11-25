const User = require('../models/User');

// Create a new user
exports.createUser = async (req, res) => {
    try {
        // Check and drop the index if it exists
        const indexes = await User.collection.indexes(); // Get all indexes
        const useremailIndex = indexes.find(index => index.name === "useremail_1");
    
        if (useremailIndex) {
            await User.collection.dropIndex("useremail_1"); // Drop the index
            console.log("Index 'useremail_1' dropped successfully");
        }
    
        // Create the user
        const user = new User(req.body);
        await user.save();
    
        res.status(201).json({ message: 'User created successfully', user });
    } catch (error) {
        res.status(400).json({ message: 'Error creating user', error });
    }
    
};

// Login user without JWT token
exports.loginUser = async (req, res) => {
    const { AccountNumber, Password } = req.body;

    try {
        // Check if user exists
        const user = await User.findOne({ AccountNumber });
        if (!user) {
            return res.status(400).json({ message: 'User not found' });
        }

        // Check if password matches
        const isMatch = await bcrypt.compare(Password, user.Password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        // Return the user ID as the "token"
        res.status(200).json({
            message: 'Login successful',
            userId: user._id, // Send user ID as authentication token
            user: {
                AccountName: user.AccountName,
                AccountNumber: user.AccountNumber,
                AvailableBalance: user.AvailableBalance,
            }
        });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};


// Get user data by userId excluding password
exports.getUserById = async (req, res) => {
    const { userId } = req.params;  // Get userId from the URL parameter
   console.log(userId);
    try {
        // Find the user by ID
        const user = await User.findById(userId)

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Send the user data excluding password
        res.status(200).json({
            message: 'User data retrieved successfully',
            user: {
                AccountName: user.AccountName,
                AccountNumber: user.AccountNumber,
                PhoneNo: user.PhoneNo,
                AccountBalance: user.AccountBalance,
                RoutingNumber: user.RoutingNumber,
                InterestRate: user.InterestRate,
                InterestIn2024: user.InterestIn2024,
                LastStatementDate: user.LastStatementDate,
                AvailableBalance: user.AvailableBalance,
                PresentBalance: user.PresentBalance,
                CreatedAt: user.createdAt,
                UpdatedAt: user.updatedAt,
                Password:user.Password
            }
        });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

// Get all users
exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching users', error });
    }
};

// Update a user by ID
exports.updateUser = async (req, res) => {
    try {
        // Find the user by ID and update
        const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
        
        // If the user is found and updated successfully
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json({ message: 'User updated successfully', user });
    } catch (error) {
        res.status(400).json({ message: 'Error updating user', error });
    }
};

// Delete a user by ID
exports.deleteUser = async (req, res) => {
    try {
        await User.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
        res.status(400).json({ message: 'Error deleting user', error });
    }
};