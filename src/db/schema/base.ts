import { integer, timestamp } from 'drizzle-orm/pg-core'

export const timestamps = {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  updatedAt: timestamp('updated_at')
    .defaultNow()
    .notNull()
    .$onUpdate(() => new Date()),
  createdAt: timestamp('created_at').defaultNow().notNull(),
}
