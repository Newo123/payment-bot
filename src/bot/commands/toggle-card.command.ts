import { MyContext } from '@/types'
import { isAdmin } from '@/utils/is-admin'
import { Bot } from 'grammy'

export async function registerToggleCardCommand(bot: Bot<MyContext>) {
  bot.command('togglecard', async (ctx) => {
    if (isAdmin(ctx)) {
      await ctx.conversation.enter('togglecard')
    }
  })
}
