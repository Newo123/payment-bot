import { db } from '@/db'
import { usersTable } from '@/db/schema/users'
import { MyContext } from '@/types'
import { eq, or } from 'drizzle-orm'

export class UserService {
  // Создание пользователя
  public async create(ctx: MyContext) {
    if (!ctx.msg?.contact?.phone_number) {
      throw new Error('User phone number not found!')
    }

    if (!ctx.from) {
      throw new Error('User in context not found!')
    }

    const userExists = await db
      .select()
      .from(usersTable)
      .where(
        or(
          eq(usersTable.telegramId, ctx.from.id),
          eq(usersTable.phone, ctx.msg.contact.phone_number),
        ),
      )
      .limit(1)

    if (userExists.length > 0) {
      throw new Error('User exist')
    }

    const users = await db
      .insert(usersTable)
      .values({
        phone: ctx.msg.contact.phone_number,
        telegramId: ctx.from.id,
        firstName: ctx.from.first_name,
        languageCode: ctx.from.language_code,
        lastName: ctx.from.last_name,
        username: ctx.from.username,
        createdAt: new Date(),
        updatedAt: new Date(),
      })
      .returning()

    return users[0]
  }
  // Обновление пользователя
  public async update(ctx: MyContext) {
    if (!ctx.from) {
      throw new Error('User in context not found!')
    }
    const userExists = await db
      .select()
      .from(usersTable)
      .where(eq(usersTable.telegramId, ctx.from.id))
      .limit(1)

    if (!userExists.length) {
      throw new Error('User not found')
    }

    const users = await db
      .update(usersTable)
      .set({
        firstName: ctx.from.first_name,
        languageCode: ctx.from.language_code,
        lastName: ctx.from.last_name,
        username: ctx.from.username,
        updatedAt: new Date(),
      })
      .where(eq(usersTable.telegramId, ctx.from.id))
      .returning()

    return users[0]
  }

  // Получение пользователя
  public async findUserByTelegramId(ctx: MyContext) {
    if (!ctx.from) {
      throw new Error('User in context not found!')
    }

    const users = await db
      .select()
      .from(usersTable)
      .where(eq(usersTable.telegramId, ctx.from.id))
      .limit(1)

    return users[0]
  }
}

export const userService = new UserService()
