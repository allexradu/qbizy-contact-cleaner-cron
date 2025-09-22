import { pgTable, uuid, varchar } from 'drizzle-orm/pg-core'
import { createSelectSchema } from 'drizzle-zod'

export const businessCardEmail = pgTable('business_card_email', {
    id: uuid('id').primaryKey().defaultRandom(),
    email: varchar('email', { length: 255 }).notNull(),
    type: varchar('type', { length: 10 }).notNull(), // mobile, home, work
})

export const selectBusinessCardEmail = createSelectSchema(businessCardEmail)
