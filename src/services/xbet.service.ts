import { CONFIG } from '@/config'
import { createHash } from 'crypto'

export class XBetService {
  private readonly baseUrl: string

  private readonly cashdeskId: string

  private readonly cashierpass: string

  private readonly hash: string

  public constructor() {
    this.baseUrl = CONFIG.XBET_API_URL
    this.cashdeskId = CONFIG.XBET_CASHDESK_ID
    this.cashierpass = CONFIG.XBET_CASHDIER_PASS
    this.hash = CONFIG.XBET_HASH
  }

  // Забираем пользователя из 1xbet
  async findUserById(userId: number) {
    // Выполнить формирование confirm
    const confirmStr = `${userId}:${this.hash}`
    const signStrA = `hash=${this.hash}&userid=${userId}&cashdeskid=${this.cashdeskId}`
    const signStrB = `userid=${userId}&cashierpass=${this.cashierpass}&hash=${this.hash}`

    const confirm = this.generateMd5(confirmStr)
    const sign = this.generateSign(signStrA, signStrB)

    const url = `${this.baseUrl}/Users/${userId}?confirm=${confirm}&cashdeskId=${this.cashdeskId}`

    // Делаем запрос
    const req = await fetch(url, {
      headers: {
        sign,
      },
    })

    const res = await req.json()

    return res as { UserId: number; Name: string; CurrencyId: number }
  }

  // Пополнение средств
  async deposit(userId: number, summa: number, lng: string) {
    const confirmStr = `${userId}:${this.hash}`
    const signStrA = `hash=${this.hash}&lng=${lng}&userid=${userId}`
    const signStrB = `summa=${summa}&cashierpass=${this.cashierpass}&cashdeskid=${this.cashdeskId}`

    const confirm = this.generateMd5(confirmStr)
    const sign = this.generateSign(signStrA, signStrB)

    const url = `${this.baseUrl}/Deposit/${userId}/Add`

    // Делаем запрос
    const req = await fetch(url, {
      method: 'POST',
      headers: {
        sign,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        cashdeskId: Number(this.cashdeskId),
        lng,
        summa,
        confirm,
      }),
    })

    const res = await req.json()
    return res as {
      Summa: number
      OperationId: number
      Success: boolean
      Message: string
    }
  }

  // Генерируем sign
  private generateSign(strA: string, strB: string) {
    const stepA = this.generateSha256(strA)
    const stepB = this.generateMd5(strB)

    return this.generateSha256(stepA + stepB)
  }

  private generateSha256(str: string) {
    return createHash('sha256').update(str).digest('hex')
  }

  private generateMd5(str: string) {
    return createHash('md5').update(str).digest('hex')
  }
}

export const xbetService = new XBetService()
