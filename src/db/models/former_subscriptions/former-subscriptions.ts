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
import { formerAccount } from '@db/schema'

export const formerSubscription = pgTable(
    'former_subscriptions',
    {
        id: uuid('id').primaryKey().defaultRandom(),
        formerAccountId: uuid('former_account_id').references(
            () => formerAccount.id,
        ),
        productCode: varchar('product_code', { length: 255 }).notNull(),
        storeTransactionId: text('store_transaction_id').notNull(),
        purchaseDate: timestamp('purchase_date').notNull(),
        store: varchar('store', { length: 100 }).notNull(),
        price: real('price').notNull(),
        currencyId: uuid('currencyId').references(() => currency.id),
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
        uniqueAccountProduct: unique().on(
            table.formerAccountId,
            table.productCode,
        ),
    }),
)
