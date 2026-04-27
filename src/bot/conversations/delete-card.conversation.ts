import { cardService } from '@/services/card.service'
import { MyContext } from '@/types/context.types'
import { Conversation, ConversationFlavor } from '@grammyjs/conversations'
import { InlineKeyboard } from 'grammy'

export async function deleteCardConversation(
  conversation: Conversation<ConversationFlavor<MyContext>, MyContext>,
  ctx: MyContext,
) {
  const cards = await cardService.findAll()

  if (!cards.length) {
    await ctx.reply('Список карт пуст')
    await conversation.halt()
  }

  const deleteButtons = new InlineKeyboard()

  cards.map((card) =>
    deleteButtons
      .text(
        `Номер карты: ${card.number} | Держатель: ${card.holder}`,
        `delete_card_${card.id}`,
      )
      .row(),
  )
  await ctx.reply('💳 Выберите карту которую хотите удалить:', {
    reply_markup: deleteButtons,
  })

  const cb = await conversation.waitForCallbackQuery(/^delete_card_/)

  const data = cb.callbackQuery.data
  const cardId = data.replace('delete_card_', '')

  const { message, success, card } = await cardService.delete(parseInt(cardId))

  if (success) {
    await cb.answerCallbackQuery({
      text: message,
    })

    await cb.editMessageText(
      `✅ ${message}:\n\nНомер карты: ${card?.number}\nДержатель: ${card?.holder}`,
    )
  } else {
    await cb.editMessageText(message)
  }
  await conversation.halt()
}
