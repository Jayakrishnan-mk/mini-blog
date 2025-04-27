const User = require('../models/user');

// Create a new User

exports.createUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // Validate if all fields are provided
        if (!name || !email || !password) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        // Create new user
        const newUser = new User({
            name,
            email,
            password, // not hasing password for now
        });

        // Save user to the database
        await newUser.save();

        res.status(201).json({ message: 'User created successfully', user: newUser });
    } catch (error) {
        console.error('Error creating user:', error);
        res.status(500).json({ message: 'Server Error' });
    }
};

// Get all Users
exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.find(); // Fetch all users
        if (!users.length) res.status(404).send("Users not found");

        res.status(200).json(users);
    } catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).json({ message: 'Server Error' });
    }
};


exports.updateUser = async (req, res) => {
    try {
        const { id } = req.params;  // Get user id from route parameters
        const { name, email, password } = req.body;  // Get updated details from the request body

        // Find the user by ID and update fields
        const updatedUser = await User.findByIdAndUpdate(
            id,
            { name, email, password },  // Fields to update
            { new: true }  // Return the updated document
        );
        console.log(updatedUser)

        if (!updatedUser) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json({ message: 'User updated successfully', user: updatedUser });
    } catch (error) {
        console.error('Error updating user:', error);
        res.status(500).json({ message: 'Server Error' });
    }
};

exports.deleteUser = async (req, res) => {
    try {
        const { id } = req.params;  // Get user id from route parameters

        // Find the user by ID and delete it
        const deletedUser = await User.findByIdAndDelete(id);

        if (!deletedUser) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
        console.error('Error deleting user:', error);
        res.status(500).json({ message: 'Server Error' });
    }
};
