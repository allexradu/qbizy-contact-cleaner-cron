import {
    boolean,
    pgTable,
    real,
    uuid,
    varchar,
    index,
} from 'drizzle-orm/pg-core'

export const currency = pgTable(
    'currencies',
    {
        id: uuid('id').primaryKey().defaultRandom(),
        name: varchar('name', { length: 255 }).notNull(),
        code: varchar('code', { length: 255 }).notNull().unique(),
        zero: boolean('zero').notNull().default(false),
        three: boolean('three').notNull().default(false),
        special: boolean('special').notNull().default(false),
        symbol: varchar('symbol', { length: 255 }).notNull(),
        symbolPlacement: varchar('symbol_placement', { length: 255 }).notNull(),
        conversionRate: real('conversion_rate'),
    },
    (table) => {
        return {
            codeIndex: index('currencies_code_index').on(table.code),
        }
    },
)
