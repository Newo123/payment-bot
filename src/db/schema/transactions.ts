import { bigint, integer, pgEnum, pgTable } from 'drizzle-orm/pg-core'
import { timestamps } from './base'
import { cardsTable } from './cards'
import { usersTable } from './users'

export const typeEnum = pgEnum('type_enum', ['DEPOSIT', 'PAYOUT'])

export const transactionsTable = pgTable('transactions', {
  amount: integer().notNull(),
  userId: integer('user_id')
    .notNull()
    .references(() => usersTable.id),
  type: typeEnum().notNull(),
  operationId: bigint('operation_id', { mode: 'number' }).notNull(),
  cardId: integer('card_id')
    .notNull()
    .references(() => cardsTable.id),
  ...timestamps,
})
