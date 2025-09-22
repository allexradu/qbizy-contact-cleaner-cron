import { pgTable, uuid, varchar } from 'drizzle-orm/pg-core'
import { createSelectSchema } from 'drizzle-zod'

export const businessCardPhone = pgTable('business_card_phones', {
    id: uuid('id').primaryKey().defaultRandom(),
    phone: varchar('phone', { length: 255 }).notNull(),
    type: varchar('type', { length: 10 }).notNull(), // mobile, home, work
})

export const selectBusinessCardPhone = createSelectSchema(businessCardPhone)
