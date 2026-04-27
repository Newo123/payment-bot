import { createBot } from './bot'

async function bootstrap() {
  try {
    const bot = createBot()

    bot.start()

    console.log('Telegram bot started')
  } catch (error) {
    console.error('Failed to start bot: ', error)

    process.exit(1)
  }
}

bootstrap()
