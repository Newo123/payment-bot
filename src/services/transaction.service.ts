import { db } from '@/db'
import { transactionsTable } from '@/db/schema/transactions'
import { InsertTransaction } from '../types'

export class TransactionService {
  public async create(data: InsertTransaction) {
    return db.insert(transactionsTable).values(data)
  }
}

export const transactionService = new TransactionService()
