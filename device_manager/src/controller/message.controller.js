const io = require('socket.io')();

io.on('connection', client => {
    console.log(`client: ${client.toString()}`)
});

io.on('*', command => {
    console.log(command)
    console.log('b')
});

io.on('take-photo', command => {
    console.log(command)
    console.log('a')
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
