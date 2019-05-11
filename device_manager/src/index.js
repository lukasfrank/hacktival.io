const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

const devicesRoute = require('./routes/devices.route');
const productsRoute = require('./routes/products.route');
const { refreshProducts } = require('./controller/products.controller');

setInterval(() => {
    refreshProducts()
}, 10000);


app.use(bodyParser.json());


app.use('/devices', devicesRoute);
app.use('/products', productsRoute);


app.listen(port, () => console.log(`App listening on port ${port}!`));
