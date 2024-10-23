// Importing required packages
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

// Initialize the app
const app = express();
const PORT = process.env.PORT || 4006;

// Middleware
app.use(bodyParser.json()); // for parsing application/json
// Connect to MongoDB
mongoose.connect(
    'mongodb+srv://alokjsx:R6GgaLGZTq4vmOju@cluster0.669gb.mongodb.net/productsDB?retryWrites=true&w=majority'
    ).then(() => {
    console.log('MongoDB connected successfully.');
}).catch((error) => {
    console.error('MongoDB connection error:', error.message);
});

// Product Schema
const productSchema = new mongoose.Schema({
    name: { type: String, required: true },
    price: { type: Number, required: true },
    description: { type: String }
});

// Product Model
const Product = mongoose.model('Product', productSchema);

// POST API to create a product
app.post('/api/products', async (req, res) => {
    const { name, price, description } = req.body;

    const product = new Product({
        name,
        price,
        description
    });

    try {
        const savedProduct = await product.save();
        res.status(201).json(savedProduct);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// GET API to retrieve all products
app.get('/api/products', async (req, res) => {
    try {
        const products = await Product.find();
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
