const io = require('socket.io')();
const { getPhoto } = require('./devices.controller');
const devices = require('../../config').devices;

const {getProducts}  = require('./products.controller');

io.on('connection', client => {
    console.log(`client: ${client.toString()}`);

    client.on('take-photo', () => {
        console.log("take-photo");
        devices.forEach(device => {
            getPhoto(device.url).then(data => {
                const { url } = data;
                sendPhoto(url)
            });
        })
    });

    client.on('get-products', () => {
        console.log("get-products");
        const products = getProducts();

        console.log(getProducts);
        sendProducts(products);
    });

});

const init = () => {
    io.listen(3001);
};

const badProductAlarm = (product) => {
    io.emit('bad-product-alarm', `Your ${product.name} will get bad soon!`);
};

const sendPhoto = (url) => {
    io.emit('new-photo', url);
};

const sendProducts = (products) => {
    io.emit('products', products);
};


module.exports = {
    init,
    badProductAlarm,
};
