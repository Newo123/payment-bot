import { MyContext } from '@/types'
import { Bot } from 'grammy'
import { registerContactEvent } from './contact.event'

export function registerBotEvents(bot: Bot<MyContext>) {
  registerContactEvent(bot)
}
