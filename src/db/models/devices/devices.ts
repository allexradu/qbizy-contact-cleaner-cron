import {
    boolean,
    index,
    pgTable,
    timestamp,
    unique,
    uuid,
    varchar,
} from 'drizzle-orm/pg-core'
import { sql } from 'drizzle-orm/sql'
import { account } from '@db/models/accounts/accounts'

export const device = pgTable(
    'devices',
    {
        id: uuid('id').primaryKey().defaultRandom(),
        accountId: uuid('account_id').references(() => account.id, {
            onDelete: 'cascade',
        }),
        deviceId: varchar('device_id', { length: 255 }).notNull(),
        modelId: varchar('model_id', { length: 255 }),
        os: varchar('os', { length: 100 }),
        version: varchar('version', { length: 100 }),
        type: varchar('type', { length: 100 }),
        brand: varchar('brand', { length: 100 }),
        totalMemory: varchar('total_memory', { length: 100 }),
        platformApiLevel: varchar('platform_api_level', { length: 100 }),
        productName: varchar('product_name', { length: 255 }),
        appVersion: varchar('app_version', { length: 50 }),
        isActive: boolean('is_active').notNull().default(true),
        lastUsedAt: timestamp('last_used_at').default(sql`NULL`),
        createdAt: timestamp('created_at')
            .default(
                sql`timezone
                ('UTC', CURRENT_TIMESTAMP)`,
            )
            .notNull(),
    },
    (table) => ({
        uniqueAccountDevice: unique().on(table.accountId, table.deviceId),
        accountIdIndex: index('device_account_id_idx').on(table.accountId),
        deviceIdIndex: index('device_device_id_idx').on(table.deviceId),
    }),
)
