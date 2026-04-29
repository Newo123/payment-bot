import { MyContext } from '@/types'
import { InlineKeyboard, InputFile } from 'grammy'
import path from 'path'

export async function help(ctx: MyContext) {
  const backKeyboard = new InlineKeyboard().text('◀️ Назад', 'back')

  const photoPath = path.join(process.cwd(), 'public', '600x400.png')
  await ctx.replyWithPhoto(new InputFile(photoPath), {
    caption: `
📌 Как узнать свой ID в 1xBet
Откройте профиль в приложении или на сайте 1xBet — ваш ID отображается в личном кабинете (обычно в верхней части экрана).
Скопируйте его и используйте для пополнения или вывода средств.
                    `,
    reply_markup: backKeyboard,
  })
}
