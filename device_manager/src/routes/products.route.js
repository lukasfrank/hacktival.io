const express = require('express');
const router = express.Router();


const { updateProducts, getProducts } = require('../controller/products.controller');

router.post('/', (req, res) => {
    const products  = req.body.products ? req.body.products : null;


    if (products) {
        updateProducts(products)
    }

    res.end();
});

router.get('/', (req, res) => {
    const products = getProducts();

    res.json(products);
});



module.exports = router;
