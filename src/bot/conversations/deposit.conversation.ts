import { MAX_DEPOSIT_AMOUNT, MIN_DEPOSIT_AMOUNT } from '@/config'
import { transactionService } from '@/services/transaction.service'
import { xbetService } from '@/services/xbet.service'
import type { MyContext, User } from '@/types'
import { ConversationFlavor, type Conversation } from '@grammyjs/conversations'
import { help } from '../handlers/help.handler'
import { start } from '../handlers/start.handler'

export async function depositConversation(
  conversation: Conversation<ConversationFlavor<MyContext>, MyContext>,
  ctx: MyContext,
  user: User,
) {
  await start(ctx)

  let tryCount = 5

  while (true) {
    const ctx2 = await conversation.wait()

    if (ctx2.callbackQuery) {
      await ctx2.answerCallbackQuery()
      const cb = ctx2.callbackQuery

      if (cb.data === 'help') {
        await help(ctx2)
        continue
      }

      if (cb.data === 'back') {
        await start(ctx2)
        continue
      }
    }

    if (ctx2.message?.text) {
      const text = ctx2.message.text.trim()

      if (!text) {
        await ctx2.reply('❌ Пожалуйста, введите корректный ID.')
        continue
      }

      const idNumber = parseInt(text, 10)
      if (isNaN(idNumber)) {
        await ctx2.reply('❌ ID должен состоять из цифр. Попробуйте ещё раз.')
        continue
      }

      const userFromBk = await xbetService.findUserById(idNumber)
      tryCount--

      if (userFromBk.UserId === 0) {
        await ctx2.reply(
          `❌ Пользователь не найден, убедитесь что вы вводите правильный ID.\nОсталось попыток: ${tryCount}.\n${tryCount === 0 ? '\nВведите /start для продолжения работы с ботом' : ''}`,
        )

        if (tryCount === 0) {
          tryCount = 0
          await conversation.halt()
        }
        continue
      }

      await ctx2.reply(`
🆔 Аккаунт ID: ${userFromBk.UserId} UZS 🇺🇿
👤 Ф.И.О: ${userFromBk.Name}
    `)

      ctx.session.deposit.bkUserId = userFromBk.UserId
      break
    }
  }

  await ctx.reply(`
⬇️ Минимальная сумма ${MIN_DEPOSIT_AMOUNT} сум 🇺🇿
⬆️ Максимальная сумма ${MAX_DEPOSIT_AMOUNT} сум 🇺🇿
\n
Введите сумму...
    `)

  while (true) {
    const { message } = await conversation.waitFor('message:text')

    const amount = parseInt(message.text)

    if (isNaN(amount)) {
      await ctx.reply(
        '❌ Сумма вывода должена состоять из цифр. Попробуйте ещё раз.',
      )
      continue
    }

    if (amount < MIN_DEPOSIT_AMOUNT) {
      await ctx.reply(`⬇️ Минимальная сумма ${MIN_DEPOSIT_AMOUNT} сум 🇺🇿`)
      continue
    }
    if (amount > MAX_DEPOSIT_AMOUNT) {
      await ctx.reply(`⬆️ Максимальная сумма ${MAX_DEPOSIT_AMOUNT} сум 🇺🇿`)
      continue
    }

    ctx.session.deposit.amount = amount
    break
  }

  const deposit = await xbetService.deposit(
    ctx.session.deposit.bkUserId,
    ctx.session.deposit.amount,
    user.languageCode ?? 'uzs',
  )

  if (deposit.Success) {
    await transactionService.create({
      amount: deposit.Summa,
      cardNumber: 5614682618051652,
      operationId: deposit.OperationId,
      type: 'DEPOSIT',
      userId: user.id,
    })
  } else {
    await ctx.reply(
      '❌ На сервере произошла ошибка.\n\nДля продолжения работы введите /start',
    )
    await conversation.halt()
    return
  }
  await ctx.reply(
    `
  #${deposit.OperationId}
  🆔 ID 1xbet: ${ctx.session.deposit.bkUserId}
  💸 Сумма: ${ctx.session.deposit.amount} сум 🇺🇿
  💰 Комиссия: 0 сум 🇺🇿 (0%)
  Карта 👉🏻 5614 6826 1805 1652

  ❗️НЕ ДОПУСТИТЕ ОШИБКИ ПРИ ОПЛАТЕ!!!

  ⚠️ На перевод даётся 10 минут. Если отправите деньги в течение этих 10 минут — они автоматически поступят на ваш счёт.

  🕝 ПЕРЕВОД НУЖНО СДЕЛАТЬ В ТЕЧЕНИЕ 10 МИНУТ

  ❗️ Если вы:
  • указали неправильную сумму
  • разделили платёж на части
  • отправили деньги через банкомат или Paynet

  ‼️ В случае ошибки: ВЫ ПОТЕРЯЕТЕ СВОИ ДЕНЬГИ!

  Обязательно переведите именно 👉🏻 ${ctx.session.deposit.amount} сум 🇺🇿, указанные ботом!
      `,
  )

  await ctx.reply('5614682618051652')

  ctx.session.deposit = {
    amount: undefined,
    bkUserId: undefined,
  }

  await conversation.halt()
}
