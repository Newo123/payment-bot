import type { MyContext, User } from '@/types'
import { Conversation, ConversationFlavor } from '@grammyjs/conversations'

export async function depositConversation(
  conversation: Conversation<ConversationFlavor<MyContext>, MyContext>,
  ctx: MyContext,
  user: User,
) {}
