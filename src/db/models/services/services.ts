import {
    boolean,
    index,
    pgTable,
    uuid,
    varchar,
    text,
    real,
} from 'drizzle-orm/pg-core'
import { currency } from '@db/models/core/currency'

const fields = {
    id: uuid('id').primaryKey().defaultRandom(),
    code: varchar('code', { length: 255 }).notNull().unique(),
    title: varchar('title', { length: 255 }).notNull(),
    description: text('description'),
    currencyId: uuid('currency_id')
        .notNull()
        .references(() => currency.id),
    price: real('price').notNull(),
    disabled: boolean('disabled').notNull().default(false),
}

export const service = pgTable('services', fields, (table) => {
    return {
        codeIndex: index('services_code_index').on(table.code),
    }
})
