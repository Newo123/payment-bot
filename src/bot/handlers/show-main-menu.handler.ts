import { MyContext } from '@/types'
import { Keyboard } from 'grammy'

export async function showMainMenu(ctx: MyContext) {
  const keyboard = new Keyboard()
    .text('📥 Пополнить счет')
    .text('📤 Вывести средства')
    .resized()
    .oneTime()

  await ctx.reply(
    `
⚡️ Быстрое и удобное пополнение и вывод средств

— Обработка без задержек
— Комиссия 0%

Выберите раздел ниже 👇🏻
      
      `,
    {
      reply_markup: keyboard,
    },
  )
}
