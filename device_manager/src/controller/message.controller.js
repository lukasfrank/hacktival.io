const io = require('socket.io')();

io.on('connection', client => {
    console.log(`client: ${client.toString()}`)
});

io.listen(3001);


const badProductAlarm = (product) => {
    io.emit('bad-product-alarm', `Your ${product.name} will get bad soon!`);
};



module.exports = {
    badProductAlarm,
};
