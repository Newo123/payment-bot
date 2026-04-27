import { CONFIG } from '@/config'
import { userService } from '@/services/user.service'
import { MyContext } from '@/types'
import { isAdmin } from '@/utils/is-admin'
import { Bot } from 'grammy'
import { showMainMenu } from '../handlers'

export async function registerStartCommand(bot: Bot<MyContext>) {
  bot.command('start', async (ctx) => {
    if (
      (ctx.chat.id.toString().startsWith('-') &&
        ctx.chat.id.toString() !== CONFIG.ADMIN_CHAT) ||
      (ctx.chat.id.toString() === CONFIG.ADMIN_CHAT &&
        ctx.message?.message_thread_id)
    ) {
      await ctx.reply('Общаюсь только лично!!!')
      return
    }

    if (isAdmin(ctx)) {
      await ctx.reply(
        'Доступные команды для администрирования:\n\n/createcard - Создание карты для оплаты\n/deletecard - удаление карты для оплаты\n/togglecard - отключение и включение карты\n/listcard - список всех карт',
      )
      return
    }

    const user = await userService.findUserByTelegramId(ctx)

    if (!user) {
      await ctx.reply('Для начала работы отправьте свой номер телефона! 👇', {
        reply_markup: {
          keyboard: [
            [
              {
                text: '📞 Отправить номер телефона',
                request_contact: true,
                request_location: true,
              },
            ],
          ],
          resize_keyboard: true,
          one_time_keyboard: true,
        },
      })
    } else {
      ctx.session.user = await userService.update(ctx)
      await showMainMenu(ctx)
    }
  })
}
