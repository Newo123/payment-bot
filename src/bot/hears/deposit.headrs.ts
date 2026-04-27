import { MyContext } from '@/types'
import { Bot } from 'grammy'

export function registerDepositHears(bot: Bot<MyContext>) {
  bot.hears('📥 Пополнить счет', async (ctx) => {
    await ctx.conversation.enter('deposit', ctx.user)
  })
}
