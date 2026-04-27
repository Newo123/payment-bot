import { CONFIG } from '@/config'
import { drizzle } from 'drizzle-orm/node-postgres'
import { Pool } from 'pg'

const pool = new Pool({
  connectionString: CONFIG.DATABASE_URL,
})

export const db = drizzle({ client: pool })
