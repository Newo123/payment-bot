import { cardStatusEnum } from '@/db/schema/cards'
import { cardService } from '@/services/card.service'
import { CardStatus } from '@/types/cards.types'
import { MyContext } from '@/types/context.types'
import { Conversation, ConversationFlavor } from '@grammyjs/conversations'
import { InlineKeyboard } from 'grammy'

export async function toggleCardConversation(
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
        `toggle_card_${card.id}`,
      )
      .row(),
  )

  await ctx.reply('💳 Выберите карту у которой хотите изменить статус:', {
    reply_markup: deleteButtons,
  })

  const cb = await conversation.waitForCallbackQuery(/^toggle_card_/)

  const data = cb.callbackQuery.data
  const cardId = data.replace('toggle_card_', '')
  await cb.answerCallbackQuery({
    text: 'Карта выбрана',
  })

  const statusButtons = new InlineKeyboard()
  cardStatusEnum.enumValues.map((status) =>
    statusButtons.text(status, `set_status_${status}`).row(),
  )

  await cb.editMessageText('Выберите статус на который хотите поменять:', {
    reply_markup: statusButtons,
  })

  const cb2 = await conversation.waitForCallbackQuery(/^set_status_/)

  const data2 = cb2.callbackQuery.data
  const status = data2.replace('set_status_', '')

  const { message, success, card } = await cardService.toggleStatus(
    parseInt(cardId),
    status as CardStatus,
  )

  if (success) {
    await cb.answerCallbackQuery({
      text: message,
    })
    await cb2.editMessageText(
      `✅ ${message}:\n\nНомер карты: ${card?.number}\nДержатель: ${card?.holder}`,
    )
  } else {
    await ctx.reply(message)
  }

  console.log(status, cardId)
}
