import { transactionsTable } from '@/db/schema/transactions'

export type InsertTransaction = typeof transactionsTable.$inferInsert
export type Transaction = typeof transactionsTable.$inferSelect
