import { bigint, pgEnum, pgTable, varchar } from 'drizzle-orm/pg-core'
import { timestamps } from './base'

export const cardStatusEnum = pgEnum('card_status', ['ENABLED', 'DISABLED'])

export const cardsTable = pgTable('cards', {
  number: bigint('number', { mode: 'number' }).notNull().unique(),
  holder: varchar({ length: 1000 }).notNull(),
  status: cardStatusEnum().default('ENABLED'),
  ...timestamps,
})
