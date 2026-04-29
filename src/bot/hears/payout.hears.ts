import { MyContext } from '@/types'
import { Bot } from 'grammy'

export function registerPayoutHears(bot: Bot<MyContext>) {
  bot.hears('📤 Вывести средства', async (ctx) => {
    await ctx.conversation.enter('payout', ctx.session.user)
  })
}
