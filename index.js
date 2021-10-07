const TelegramApi = require('node-telegram-bot-api')
const {gameOptions, againOptions} = require('./options')
const token = '2071754776:AAEvKKNw80FyW1Rlm4EBUjw2qg2c2s1ZtPg'

const bot = new TelegramApi(token, {polling: true})

const chats = {}


const startGame = async (chatId) => {
    await bot.sendMessage(chatId, 'Крч смотри сейчас я загодаю цифру от 0 до 9 и если ты отгодал ты не еблан если не отгадал ебланище конченое')
    const randomNumber = Math.floor(Math.random() * 10)
    chats[chatId] = randomNumber;
    await bot.sendMessage(chatId, 'Отгадывай Ебалай', gameOptions)
}

const start = () => {
    bot.setMyCommands([
        {command: '/start', description: 'Приветствие'},
        {command: '/info', description: 'Ответ на приветствие'},
        {command: '/game', description: 'Не еблан Еблан'},
    ])

    bot.on('message', async msg => {
        const text = msg.text;
        const chatId =msg.chat.id;

        if (text === '/start') {
            await bot.sendSticker(chatId, 'https://tlgrm.ru/_/stickers/80a/5c9/80a5c9f6-a40e-47c6-acc1-44f43acc0862/1.webp')
            return  bot.sendMessage(chatId, `Бля не пиши сюда больше чмо`)
        }
        if (text === '/info') {
            return  bot.sendMessage(chatId,`Иди в пизду ${msg.from.first_name}`);
        }
        if(text === '/game') {
          return startGame(chatId);
        }
        return bot.sendMessage(chatId,'Бля брат да ты заебал нихуя не понятно напиши через /...')

    })

    bot.on('callback_query', msg => {
        const data = msg.data;
        const chatId = msg.message.chat.id;
        if (data === '/again') {
            return startGame(chatId)
        }
        if (data === chats[chatId]) {
            return bot.sendMessage(chatId, `К сожалению ты ебаный неудачник и при том и ебланище ${chats[data]}`, againOptions)
        } else {
            return bot.sendMessage(chatId, `Поздравляю ты не еблан!!!! ${chats[data]}`, againOptions)
        }
    })
}

start()

