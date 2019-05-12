const Telegraf = require('telegraf');
const socket = require('socket.io-client')('http://localhost:3001');
const bot = new Telegraf(process.env.BOT_TOKEN);

let usr;

socket.on('connect', () => {
    console.log('connected')
});
socket.on('bad-product-alarm', function(data){
    console.log(data);
    usr.reply(data)
});

socket.on('new-photo', function(data){
    console.log(data);
    usr.replyWithPhoto(data);
});

socket.on('products', function(data){
    console.log(data);
    usr.reply(data);
});

socket.on('disconnect', console.log);

bot.start((ctx) => {
    usr = ctx;
    ctx.reply('Welcome to your smart fridge!')
});
bot.help((ctx) => ctx.reply('Send me a sticker'));
bot.command('photo', (ctx) => {
    socket.emit('take-photo');
    ctx.reply('One moment please, I will take a photo of your fridge.')
});
bot.command('products', (ctx) => {
    socket.emit('get-products');
    ctx.reply('One moment please, I will tell it you in a second.')
});
bot.on('sticker', (ctx) => ctx.reply('👍'));
bot.hears('hi', (ctx) => ctx.reply('Hey there'));
bot.launch();

