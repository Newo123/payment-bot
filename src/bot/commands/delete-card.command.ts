import { MyContext } from '@/types'
import { isAdmin } from '@/utils/is-admin'
import { Bot } from 'grammy'

export async function registerDeleteCardCommand(bot: Bot<MyContext>) {
  bot.command('deletecard', async (ctx) => {
    if (isAdmin(ctx)) {
      await ctx.conversation.enter('deletecard')
    }
  })
}
