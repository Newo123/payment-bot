import { ConversationFlavor } from '@grammyjs/conversations'
import { Context, SessionFlavor } from 'grammy'
import { User } from './users.types'

export interface SessionDepositData {
  bkUserId?: number
  amount?: number
}

export interface SessionData {
  deposit?: SessionDepositData
  user?: User
}

export type MyContext = Context &
  ConversationFlavor<Context> &
  SessionFlavor<SessionData>
