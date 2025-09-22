import { pgTable, uuid, real, uniqueIndex } from 'drizzle-orm/pg-core'
import { country, smsProvider, currency } from '@db/schema'

export const smsVerificationPrice = pgTable(
    'sms_verification_prices',
    {
        id: uuid('id').primaryKey().defaultRandom(),
        countryId: uuid('country_id')
            .notNull()
            .references(() => country.id),
        providerId: uuid('provider_id')
            .notNull()
            .references(() => smsProvider.id),
        price: real('price').notNull(),
        currencyId: uuid('currency_id')
            .notNull()
            .references(() => currency.id),
    },
    (table) => {
        return {
            uniqueCountryProvider: uniqueIndex('unique_country_provider').on(
                table.countryId,
                table.providerId,
            ),
        }
    },
)
