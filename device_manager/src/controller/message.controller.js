const io = require('socket.io')();
const { getPhoto } = require('./devices.controller');
const devices = require('../../config').devices;

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


module.exports = {
    init,
    badProductAlarm,
};
