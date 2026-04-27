import { MyContext } from '@/types'
import { Bot } from 'grammy'
import { registerDepositHears } from './deposit.headrs'

export function registerBotHears(bot: Bot<MyContext>) {
  registerDepositHears(bot)
}
