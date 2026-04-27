import { userService } from '@/services/user.service'
import { MyContext } from '@/types'
import { Bot } from 'grammy'
import { showMainMenu } from '../handlers'

export async function registerContactEvent(bot: Bot<MyContext>) {
  bot.on('message:contact', async (ctx) => {
    ctx.session.user = await userService.create(ctx)
    await showMainMenu(ctx)
  })
}
