
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');


const app = express();
const port = process.env.PORT || 3000;

mongoose.connect('your_database_url', { useNewUrlParser: true, useUnifiedTopology: true });

const postSchema = new mongoose.Schema({
    photo: String,
    description: String,
    phone: String,
    location: String
});

const Post = mongoose.model('Post', postSchema)

app.use(bodyParser.json());


app.post('/submit-post', async (req, res) => {
    try {
        
        const newPost = new Post(req.body);

        
        await newPost.save();

        res.json({ success: true });
    } catch (error) {
        console.error('Error submitting post:', error);
        res.status(500).json({ success: false, error: 'Internal server error' });
    }
});


app.get('/get-updated-products', async (req, res) => {
    try {
        
        const products = await Post.find({}, 'description');

        res.json({ products });
    } catch (error) {
        console.error('Error fetching products:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});


app.listen(port, () => {
    console.log(`Server is listening at http://localhost:${port}`);
});
