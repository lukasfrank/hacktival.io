const Telegraf = require('telegraf');
const socket = require('socket.io-client')('http://localhost:3001');
const bot = new Telegraf(process.env.BOT_TOKEN);

let usr;

socket.on('connect', console.log);
socket.on('bad-product-alarm', function(data){
    console.log(data);
    usr.reply(data)
});
socket.on('disconnect', console.log);



bot.start((ctx) => {
    usr = ctx;
    ctx.reply('Welcome')
});
bot.help((ctx) => ctx.reply('Send me a sticker'));
bot.on('sticker', (ctx) => ctx.reply('👍'));
bot.hears('hi', (ctx) => ctx.reply('Hey there'));
bot.launch();

