import { usersTable } from '@/db/schema/users'

export type InsertUser = typeof usersTable.$inferInsert
export type User = typeof usersTable.$inferSelect
