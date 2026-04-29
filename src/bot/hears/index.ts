import { MyContext } from '@/types'
import { Bot } from 'grammy'
import { registerDepositHears } from './deposit.hears'
import { registerPayoutHears } from './payout.hears'

export function registerBotHears(bot: Bot<MyContext>) {
  registerDepositHears(bot)
  registerPayoutHears(bot)
}
