const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

const devicesRoute = require('./routes/devices.route');
const productsRoute = require('./routes/products.route');
const { refreshProducts } = require('./controller/products.controller');
const { badProductAlarm } = require('./controller/message.controller');

const { init } = require('./controller/message.controller');

init();
setInterval(() => {
    const badProducts = refreshProducts();
    badProducts.forEach(badProductAlarm)
}, 50000);


app.use(bodyParser.json());


app.use('/devices', devicesRoute);
app.use('/products', productsRoute);


app.listen(port, () => console.log(`App listening on port ${port}!`));
