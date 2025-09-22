import { pgTable, text, timestamp, uuid, varchar } from 'drizzle-orm/pg-core'
import { AccountType } from '@const/accounts'
import { sql } from 'drizzle-orm/sql'
import { country } from '@db/models/core/country'

export const formerAccount = pgTable('former_accounts', {
    id: uuid('id').primaryKey().defaultRandom(),
    type: varchar('type', { length: 255 })
        .notNull()
        .default(AccountType.ACCOUNT),
    countryId: uuid('country_id').references(() => country.id),
    createdAt: timestamp('created_at')
        .default(
            sql`timezone
            ('UTC', CURRENT_TIMESTAMP)`,
        )
        .notNull(),
    lastLogin: timestamp('last_login')
        .default(
            sql`timezone
            ('UTC', CURRENT_TIMESTAMP)`,
        )
        .notNull(),
    lastUpdated: timestamp('last_updated')
        .default(
            sql`timezone
            ('UTC', CURRENT_TIMESTAMP)`,
        )
        .notNull(),
    deactivatedAt: timestamp('deactivated_at').default(sql`NULL`),
    deactivatedReason: text('deactivated_reason').default(sql`NULL`),
})
