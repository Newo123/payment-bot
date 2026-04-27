import { CONFIG } from '@/config'
import type { MyContext, SessionData } from '@/types'
import { conversations } from '@grammyjs/conversations'
import { Bot, session } from 'grammy'
import { registerBotCommands } from './commands'
import { registerConversations } from './conversations'
import { registerBotEvents } from './events'
import { registerBotHears } from './hears'

function initial(): SessionData {
  return {
    user: undefined,
    deposit: undefined,
  }
}
export function createBot() {
  const bot = new Bot<MyContext>(CONFIG.BOT_TOKEN)

  bot.use(
    session({
      initial,
    }),
  )
  bot.use(
    conversations({
      plugins: [session({ initial })],
    }),
  )

  registerConversations(bot)
  registerBotCommands(bot)
  registerBotEvents(bot)
  registerBotHears(bot)

  return bot
}
