import { pgTable, uuid, varchar } from 'drizzle-orm/pg-core'
import { createSelectSchema } from 'drizzle-zod'

export const businessCardWebsite = pgTable('website', {
    id: uuid('id').primaryKey().defaultRandom(),
    url: varchar('url', { length: 1000 }).notNull(),
})

export const selectBusinessCardWebsite = createSelectSchema(businessCardWebsite)
