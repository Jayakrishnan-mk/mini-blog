const Post = require('../models/post');

// Create a Post
exports.createPost = async (req, res) => {
    try {
        const { title, content, user } = req.body;
        const newPost = new Post({ title, content, user });
        await newPost.save();
        res.status(201).json(newPost);
    } catch (error) {
        console.error('Error creating post:', error);
        res.status(500).send('Internal Server Error');
    }
};

// Get All Posts (with user populated)
exports.getAllPosts = async (req, res) => {
    try {
        const posts = await Post.find().populate('user', 'name email'); // Only show name and email of user
        res.status(200).json(posts);
    } catch (error) {
        console.error('Error fetching posts:', error);
        res.status(500).send('Internal Server Error');
    }
};

// Update a Post
exports.updatePost = async (req, res) => {
    try {
        const { title, content } = req.body;
        const updatedPost = await Post.findByIdAndUpdate(
            req.params.id,
            { title, content },
            { new: true }
        );
        if (!updatedPost) return res.status(404).send('Post not found');
        res.status(200).json(updatedPost);
    } catch (error) {
        console.error('Error updating post:', error);
        res.status(500).send('Internal Server Error');
    }
};

// Delete a Post
exports.deletePost = async (req, res) => {
    try {
        const deletedPost = await Post.findByIdAndDelete(req.params.id);
        if (!deletedPost) return res.status(404).send('Post not found');
        res.status(200).send('Post deleted successfully');
    } catch (error) {
        console.error('Error deleting post:', error);
        res.status(500).send('Internal Server Error');
    }
};
