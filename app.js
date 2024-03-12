const express = require('express');
const app = express();
const PORT = 3000;

// Middleware to parse request body
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// In-memory "database" for products
let products = [];

// CRUD Operations
// Create Product
app.post('/products', (req, res) => {
    const { name, price } = req.body;
    const newProduct = { id: products.length + 1, name, price };
    products.push(newProduct);
    res.status(201).send(newProduct);
});

// Read Products
app.get('/products', (req, res) => {
    res.status(200).send(products);
});

// Update Product
app.put('/products/:id', (req, res) => {
    const { id } = req.params;
    const { name, price } = req.body;
    const product = products.find(p => p.id === parseInt(id));
    if (product) {
        product.name = name;
        product.price = price;
        res.status(200).send(product);
    } else {
        res.status(404).send('Product not found');
    }
});

// Delete Product
app.delete('/products/:id', (req, res) => {
    const { id } = req.params;
    products = products.filter(p => p.id !== parseInt(id));
    res.status(200).send(`Product with id ${id} deleted`);
});

// Start server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

module.exports = app;
