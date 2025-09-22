import { pgTable, uniqueIndex, uuid, varchar } from 'drizzle-orm/pg-core'
import { country } from '@db/schema'
import { createSelectSchema } from 'drizzle-zod'
import { z } from 'zod'

export const fields = {
    id: uuid('id').primaryKey().defaultRandom(),
    countryId: uuid('country_id')
        .notNull()
        .references(() => country.id),
    prefix: varchar('prefix', { length: 255 }).notNull(),
}

export const phonePrefix = pgTable('phone_prefixes', fields, (table) => {
    return {
        uniqueCountryPrefix: uniqueIndex('unique_country_prefix').on(
            table.countryId,
            table.prefix,
        ),
    }
})

export const phonePrefixFields = [
    ...Object.keys(fields),
    'country',
    'countryCode',
]

export const selectPhonePrefixSchema = createSelectSchema(phonePrefix)
    .partial()
    .extend({
        country: z.string().optional(),
        countryCode: z.string().optional(),
    })
