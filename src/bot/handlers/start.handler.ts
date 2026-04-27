import { MyContext } from '@/types/context.types'
import { InlineKeyboard } from 'grammy'

export async function start(ctx: MyContext) {
  if (ctx.callbackQuery) {
    await ctx.answerCallbackQuery().catch(() => {})
  }
  await ctx.deleteMessage().catch(() => {})

  const helpKeyboard = new InlineKeyboard().text(
    '❓ Как узнать свой id?',
    'help',
  )

  await ctx.reply('Введите Ваш id:', {
    reply_markup: helpKeyboard,
  })
}
