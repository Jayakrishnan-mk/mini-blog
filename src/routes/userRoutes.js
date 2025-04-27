const express = require('express');
const { createUser, getAllUsers, updateUser, deleteUser } = require('../controllers/userController');

const router = express.Router();

// Create User
router.post('/', createUser);

// Get All Users
router.get('/', getAllUsers);

router.put('/:id', updateUser);  // :id for identifying the user to update

router.delete('/:id', deleteUser);  // :id for identifying the user to delete

module.exports = router;
