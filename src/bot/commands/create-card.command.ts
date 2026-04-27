import { MyContext } from '@/types'
import { isAdmin } from '@/utils/is-admin'
import { Bot } from 'grammy'

export async function registerCreateCardCommand(bot: Bot<MyContext>) {
  bot.command('createcard', async (ctx) => {
    if (isAdmin(ctx)) {
      await ctx.conversation.enter('createcard')
    }
  })
}
