const express = require('express');
const app = express();
const axios = require('axios');
const PORT = 3000;

app.get('/categories/:category/products', async (req, res) => {
    const category = req.params.category;
    const n = parseInt(req.query.n) || 10;
    const page = parseInt(req.query.page) || 1;
    try {
        const response = await axios.get(`http://20.244.56.144/test/companies/ANZ/categories/${category}/products/top-${n}-minPrice-0&maxPrice-1000`);
        const products = response.data.products.map(product => ({
            id: generateUniqueId(), 
            name: product.name,
            price: product.price,
            rating: product.rating,
            company: 'ANZ' 
        }));
        res.json(products);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.get('/categories/:category/products/:productid', async (req, res) => {
    const productId = req.params.productid;
    try {
        const response = await axios.get(`http://20.244.56.144/test/products/${productId}`);
        const productDetails = response.data;
        res.json(productDetails);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});



app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

function generateUniqueId() {
    return Math.random().toString(36).substr(2, 9);
}
