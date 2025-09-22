import { boolean, pgTable, uuid, varchar, index } from 'drizzle-orm/pg-core'
import { currency } from '@db/models/core/currency'
import { createSelectSchema } from 'drizzle-zod'

const fields = {
    id: uuid('id').primaryKey().defaultRandom(),
    name: varchar('name', { length: 255 }).notNull(),
    code: varchar('code', { length: 255 }).notNull().unique(),
    apple: boolean('apple').notNull().default(false),
    google: boolean('google').notNull().default(false),
    paypal: boolean('paypal').notNull().default(false),
    currencyId: uuid('currency_id')
        .notNull()
        .references(() => currency.id),
    paidVerificationOnly: boolean('paid_verification_only')
        .notNull()
        .default(false),
    paidMembershipOnly: boolean('paid_membership_only')
        .notNull()
        .default(false),
    noShipping: boolean('no_shipping').notNull().default(false),
    disabled: boolean('disabled').notNull().default(false),
    disabledReason: varchar('disabled_reason', { length: 255 }),
}

export const country = pgTable('countries', fields, (table) => {
    return {
        codeIndex: index('countries_code_index').on(table.code),
    }
})

export const selectCountrySchema = createSelectSchema(country).partial()
export const countryFields = Object.keys(fields)
