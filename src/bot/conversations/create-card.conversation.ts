import { cardService } from '@/services/card.service'
import { Card } from '@/types/cards.types'
import { MyContext } from '@/types/context.types'
import { Conversation, ConversationFlavor } from '@grammyjs/conversations'

export async function createCardConversation(
  conversation: Conversation<ConversationFlavor<MyContext>, MyContext>,
  ctx: MyContext,
) {
  const data: Pick<Card, 'number' | 'holder'> = {
    number: NaN,
    holder: 'No holder',
  }

  await ctx.reply('Введите номер карты:\n\nПример: 5614682618051652')
  console.log('⏳ Ожидаю ввод номера карты...')
  while (true) {
    const { message, reply } = await conversation.waitFor('message:text')

    const number = message.text.trim()

    if (!/^\d+$/.test(number)) {
      await reply('❌ Номер карты должен быть целым числом')
      continue
    }

    data.number = parseInt(number)
    break
  }
  await ctx.reply('Введите держателя карты:')

  while (true) {
    const { message, reply } = await conversation.waitFor('message:text')

    const holder = message.text.trim()

    if (!holder) {
      await reply('❌ Держатель карты обязательное поле')
      continue
    }

    data.holder = holder
    break
  }

  const { message, success, card } = await cardService.create(data)

  if (success && card) {
    await ctx.reply(`
✅ ${message}:

Номер карты: ${card.number}
Держатель: ${card.holder}
`)
  } else {
    await ctx.reply(message)
  }

  await conversation.halt()
}
