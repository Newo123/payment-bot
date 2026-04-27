import { integer, pgTable, varchar } from 'drizzle-orm/pg-core'
import { timestamps } from './base'

export const usersTable = pgTable('users', {
  phone: varchar({ length: 255 }).notNull().unique(),
  telegramId: integer('telegram_id').notNull().unique(),
  languageCode: varchar('language_code', { length: 255 }),
  firstName: varchar('first_name', { length: 255 }),
  lastName: varchar('last_name', { length: 255 }),
  username: varchar({ length: 255 }),
  ...timestamps,
})
