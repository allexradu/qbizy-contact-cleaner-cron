import {
    boolean,
    pgTable,
    real,
    text,
    timestamp,
    unique,
    uuid,
    varchar,
} from 'drizzle-orm/pg-core'
import { sql } from 'drizzle-orm/sql'
import { currency } from '@db/models/core/currency'
import { account } from '@db/models/accounts/accounts'
import { createSelectSchema } from 'drizzle-zod'
import { z } from 'zod'

export const subscription = pgTable(
    'subscriptions',
    {
        id: uuid('id').primaryKey().defaultRandom(),
        accountId: uuid('account_id').references(() => account.id),
        productCode: varchar('product_code', { length: 255 }).notNull(),
        storeTransactionId: text('store_transaction_id').notNull(),
        purchaseDate: timestamp('purchase_date').notNull(),
        store: varchar('store', { length: 100 }).notNull(),
        price: real('price').notNull(),
        currencyId: uuid('currencyId').references(() => currency.id),
        willRenew: boolean('will_renew').notNull().default(true),
        originalPurchaseDate: timestamp('original_purchase_date').default(
            sql`NULL`,
        ),
        expiresDate: timestamp('expires_date').notNull(),
        isActive: boolean('is_active').notNull().default(true),
        refundedAt: timestamp('refunded_at').default(sql`NULL`),
        gracePeriodExpiresDate: timestamp('grace_period_expires_date').default(
            sql`NULL`,
        ),
        unsubscribeDetectedAt: timestamp('unsubscribe_detected_at').default(
            sql`NULL`,
        ),
        ownershipType: varchar('ownership_type', { length: 100 }).notNull(),
        billingIssuesDetectedAt: timestamp(
            'billing_issues_detected_at',
        ).default(sql`NULL`),
        periodType: varchar('period_type', { length: 100 }).notNull(),
        isSandbox: boolean('is_sandbox').notNull().default(false),
        createdAt: timestamp('created_at')
            .default(
                sql`timezone
                ('UTC', CURRENT_TIMESTAMP)`,
            )
            .notNull(),
        lastUpdated: timestamp('last_updated')
            .default(
                sql`timezone
                ('UTC', CURRENT_TIMESTAMP)`,
            )
            .notNull(),
    },
    (table) => ({
        uniqueAccountProduct: unique().on(table.accountId, table.productCode),
    }),
)

export const selectSubscriptionShema = createSelectSchema(subscription)
    .omit({
        currencyId: true,
    })
    .extend({
        currencyCode: z.string().nullable(),
    })
