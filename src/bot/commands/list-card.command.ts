import { cardService } from '@/services/card.service'
import { MyContext } from '@/types'
import { isAdmin } from '@/utils/is-admin'
import { Bot } from 'grammy'

export async function registerListCardCommand(bot: Bot<MyContext>) {
  bot.command('listcard', async (ctx) => {
    if (isAdmin(ctx)) {
      const cards = await cardService.findAll()

      if (!cards.length) {
        await ctx.reply('Список карт пуст')
      }

      await ctx.reply(`
💳 Список всех карт:
${cards.map(
  (card, index) => `
${index + 1}.
Номер карты: ${card.number};
Держатель: ${card.holder};
Статус: ${card.status};`,
)}
    `)
    }
  })
}
