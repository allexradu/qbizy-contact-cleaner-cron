import {
    index,
    integer,
    pgTable,
    text,
    timestamp,
    uuid,
    varchar,
} from 'drizzle-orm/pg-core'
import { businessCard } from '@db/models/busines-cards/business-cards'
import { sql } from 'drizzle-orm/sql'
import { createSelectSchema } from 'drizzle-zod'
import { file } from '@db/models/core/files'
import { z } from 'zod'

export const businessCardContact = pgTable(
    'business_card_contact',
    {
        id: uuid('id').primaryKey().defaultRandom(),
        shortId: varchar('shortId', { length: 255 }).notNull().unique(),
        name: varchar('name', { length: 255 }),
        phoneNumber: varchar('phone_number', { length: 255 }),
        companyName: varchar('company_name', { length: 255 }),
        notes: text('notes'),
        businessCardId: uuid('business_card_id')
            .notNull()
            .references(() => businessCard.id),
        createdAt: timestamp('created_at')
            .default(
                sql`timezone
                ('UTC', CURRENT_TIMESTAMP)`,
            )
            .notNull(),
        lastUpdated: timestamp('last_updated'),
        expires: timestamp('expires'),
        seenCount: integer('seen_count').notNull().default(0),
        vcfQrCodeFileId: uuid('vcf_qr_code_file_id').references(() => file.id, {
            onDelete: 'no action',
            onUpdate: 'no action',
        }),
        createdBy: varchar('created_by', { length: 255 }).default('system'),
    },
    (table) => ({
        shortIdIdx: index('business_card_short_id_idx').on(table.shortId),
    }),
)

export const selectBusinessCardContact = createSelectSchema(businessCardContact)
    .omit({ vcfQrCodeFileId: true })
    .extend({
        vcfQrCodeFileUrl: z.string().nullable(),
    })
