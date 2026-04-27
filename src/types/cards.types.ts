import { cardsTable, cardStatusEnum } from '@/db/schema/cards'

export type InsertCard = typeof cardsTable.$inferInsert
export type Card = typeof cardsTable.$inferSelect
export type CardStatus = (typeof cardStatusEnum.enumValues)[number]
