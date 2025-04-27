const express = require('express');
const mongoose = require('mongoose');
const userRoutes = require('./src/routes/userRoutes');
const postRoutes = require('./src/routes/postRoutes');

const app = express();
app.use(express.json());


// Mount user routes
app.use('/api/users', userRoutes);
// post routes
app.use('/api/posts', postRoutes);

// Basic Health Route....
app.get('/', (req, res) => {
    res.send('API is running.')
});

// MongoDB Connection....
mongoose.connect('mongodb://localhost:27017/miniBlog')
    .then(() => {
        console.log('Connected to MongoDB');
        app.listen(3000, () => console.log('Server Started on Port 3000'));
    })
    .catch((err) => {
        console.error('MongoDB connection error:', err);
    });
