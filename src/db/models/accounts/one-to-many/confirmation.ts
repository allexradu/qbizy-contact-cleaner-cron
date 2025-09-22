import {
    pgTable,
    timestamp,
    uuid,
    varchar,
    index,
    real,
    boolean,
} from 'drizzle-orm/pg-core'
import { account, smsProvider, country } from '@db/schema'
import {
    AccountConfirmationMethod,
    AccountConfirmationType,
} from '@const/types'
import { sql } from 'drizzle-orm/sql'

export const accountConfirmation = pgTable(
    'account_confirmations',
    {
        id: uuid('id').primaryKey().defaultRandom(),
        accountId: uuid('account_id')
            .notNull()
            .references(() => account.id),
        code: varchar('code', { length: 255 }).notNull(),
        method: varchar('method', { length: 255 })
            .notNull()
            .default(AccountConfirmationMethod.EMAIL),
        timestamp: timestamp('timestamp')
            .default(sql`timezone('UTC', CURRENT_TIMESTAMP)`)
            .notNull(),
        providerId: uuid('provider_id').references(() => smsProvider.id),
        countryId: uuid('country_id').references(() => country.id),
        price: real('price'),
        type: varchar('type', { length: 255 })
            .notNull()
            .default(AccountConfirmationType.ACCOUNT_CONFIRMATION),
        phoneNumber: varchar('phone_number', { length: 255 }).default(sql`NULL`),
        isUsed: boolean('is_used').notNull().default(false),
    },
    (table) => ({
        timestampIndex: index('account_confirmations_timestamp_index').on(
            table.timestamp,
        ),
    }),
)
