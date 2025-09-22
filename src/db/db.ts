import { neon } from '@neondatabase/serverless'
import { drizzle } from 'drizzle-orm/neon-http'
import type { Env } from '@const/types'

import * as schema from './schema'

export class Db {
    private static instance: Db
    private db: ReturnType<typeof drizzle>

    private constructor(env: Env) {
        const sql = neon(env.DATABASE_URL)
        this.db = drizzle(sql, { schema })
    }

    public static getInstance(env: Env): Db {
        if (!Db.instance) {
            Db.instance = new Db(env)
        }
        return Db.instance
    }

    public getDb() {
        return this.db
    }
}
