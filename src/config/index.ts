import * as dotenv from 'dotenv'

dotenv.config()

export const CONFIG = {
  BOT_TOKEN: process.env.BOT_TOKEN || '',
  DATABASE_URL: `postgresql://${process.env.DATABASE_USER}:${process.env.DATABASE_PASSWORD}@localhost:${process.env.DATABASE_PORT}/${process.env.DATABASE_NAME}?schema=public`,

  // 1XBET
  XBET_API_URL: process.env.XBET_API_URL || '',
  XBET_CASHDESK_ID: process.env.XBET_CASHDESK_ID || '',
  XBET_CASHDIER_PASS: process.env.XBET_CASHIER_PASS || '',
  XBET_HASH: process.env.XBET_HASH || '',

  // Telegram админская группа с темами
  ADMIN_CHAT: process.env.ADMIN_CHAT || '',
  ADMIN_CHAT_DEPOSIT_THEME: process.env.ADMIN_CHAT_DEPOSIT_THEME || '',
  ADMIN_CHAT_PAYOUT_THEME: process.env.ADMIN_CHAT_PAYOUT_THEME || '',
  ADMIN_CHAT_GENERAL_THEME: process.env.ADMIN_CHAT_GENERAL_THEME || '',
}

export const MIN_DEPOSIT_AMOUNT = 80000
export const MAX_DEPOSIT_AMOUNT = 11000000

export const MIN_WITHDRAW_AMOUNT = 80000
export const MAX_WITHDRAW_AMOUNT = 11000000
