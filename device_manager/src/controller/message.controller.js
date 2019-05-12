const io = require('socket.io')();
const { getPhoto } = require('./devices.controller');
const devices = require('../../config').devices;

io.on('connection', client => {
    console.log(`client: ${client.toString()}`);

    client.on('take-photo', () => {
        console.log("take-photo");
        getPhoto(devices[0].url);
    });

});






const init = () => {
    io.listen(3001);
};

const badProductAlarm = (product) => {
    io.emit('bad-product-alarm', `Your ${product.name} will get bad soon!`);
};



module.exports = {
    init,
    badProductAlarm,
};
