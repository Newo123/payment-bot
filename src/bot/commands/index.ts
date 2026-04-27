import { MyContext } from '@/types'
import { Bot } from 'grammy'
import { registerCreateCardCommand } from './create-card.command'
import { registerDeleteCardCommand } from './delete-card.command'
import { registerListCardCommand } from './list-card.command'
import { registerStartCommand } from './start.command'
import { registerToggleCardCommand } from './toggle-card.command'

export async function registerBotCommands(bot: Bot<MyContext>) {
  registerStartCommand(bot)
  registerCreateCardCommand(bot)
  registerListCardCommand(bot)
  registerDeleteCardCommand(bot)
  registerToggleCardCommand(bot)
}
