import { CONFIG } from '@/config'
import { MyContext } from '../types'

export const isAdmin = (ctx: MyContext) => {
  if (!ctx.chat) return false
  return (
    ctx.chat.id.toString() === CONFIG.ADMIN_CHAT &&
    !ctx.message?.message_thread_id
  )
}
