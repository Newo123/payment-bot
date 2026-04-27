import type { MyContext } from '@/types'
import { createConversation } from '@grammyjs/conversations'
import { Bot } from 'grammy'
import { createCardConversation } from './create-card.conversation'
import { deleteCardConversation } from './delete-card.conversation'
import { depositConversation } from './deposit.conversation'
import { toggleCardConversation } from './toggle-card.conversation'

export function registerConversations(bot: Bot<MyContext>) {
  bot.use(createConversation(depositConversation, 'deposit'))
  bot.use(createConversation(createCardConversation, 'createcard'))
  bot.use(createConversation(deleteCardConversation, 'deletecard'))
  bot.use(createConversation(toggleCardConversation, 'togglecard'))
}
