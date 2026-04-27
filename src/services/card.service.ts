import { db } from '@/db'
import { cardsTable } from '@/db/schema/cards'
import { eq } from 'drizzle-orm'
import { Card, CardStatus, InsertCard } from '../types'

type ResponseType = Promise<{
  card?: Card
  success: boolean
  message: string
}>

export class CardService {
  public async create(data: InsertCard): ResponseType {
    const cardExists = await db
      .select()
      .from(cardsTable)
      .where(eq(cardsTable.number, data.number))
      .limit(1)

    if (cardExists.length) {
      return {
        success: false,
        message: 'Карта уже существует',
      }
    }

    const cards = await db.insert(cardsTable).values(data).returning()

    return {
      card: cards[0],
      message: 'Карта успешно создана',
      success: true,
    }
  }
  public async delete(id: number): ResponseType {
    const cards = await db
      .delete(cardsTable)
      .where(eq(cardsTable.id, id))
      .returning()
    return {
      message: 'Карта успешно удалена',
      success: true,
      card: cards[0],
    }
  }
  public async findAll() {
    return db.select().from(cardsTable)
  }
  public async toggleStatus(id: number, status: CardStatus): ResponseType {
    const cardExists = await db
      .select()
      .from(cardsTable)
      .where(eq(cardsTable.id, id))
      .limit(1)

    if (!cardExists.length) {
      return {
        success: false,
        message: 'Карта не найдена',
      }
    }

    const cards = await db
      .update(cardsTable)
      .set({
        status,
      })
      .where(eq(cardsTable.id, id))
      .returning()
    return {
      message: 'Статус карты успешно обновлен',
      success: true,
      card: cards[0],
    }
  }
}

export const cardService = new CardService()
