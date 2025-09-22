import { pgTable, uuid, varchar } from 'drizzle-orm/pg-core'

export const smsProvider = pgTable('sms_providers', {
    id: uuid('id').primaryKey().defaultRandom(),
    name: varchar('name', { length: 255 }).notNull(),
})
