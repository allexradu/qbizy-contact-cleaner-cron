import { pgTable, text, timestamp, uuid, varchar } from 'drizzle-orm/pg-core'
import { createSelectSchema } from 'drizzle-zod'
import { account, file } from '@db/schema'
import { z } from 'zod'
import { selectBusinessCardEmail } from '@db/models/busines-cards/business-card-email'
import { selectBusinessCardPhone } from '@db/models/busines-cards/business-card-phone'
import { selectBusinessCardWebsite } from '@db/models/busines-cards/business-card-website'
import { sql } from 'drizzle-orm/sql'

export const businessCard = pgTable('business_cards', {
    id: uuid('id').primaryKey().defaultRandom(),
    accountId: uuid('account_id')
        .notNull()
        .references(() => account.id),
    name: varchar('name', { length: 255 }).notNull(), // Name of the business card
    firstName: varchar('first_name', { length: 255 }),
    lastName: varchar('last_name', { length: 255 }),
    companyName: varchar('company_name', { length: 255 }),
    jobTitle: varchar('job_title', { length: 255 }),
    role: varchar('role', { length: 255 }),
    department: varchar('department', { length: 255 }),
    note: text('note'),
    eventName: varchar('event_name', { length: 255 }),
    topic: varchar('topic', { length: 255 }),
    fileId: uuid('file_id').references(() => file.id, {
        onDelete: 'no action',
        onUpdate: 'no action',
    }), // QR code file ID
    vcfFileId: uuid('vcf_file_id').references(() => file.id, {
        onDelete: 'no action',
        onUpdate: 'no action',
    }),
    profilePhotoFileId: uuid('profile_photo_file_id').references(
        () => file.id,
        {
            onDelete: 'no action',
            onUpdate: 'no action',
        },
    ),
    messageTemplate: text('message_template'),
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
})

export const selectBusinessCard = createSelectSchema(businessCard)

export const extendedBusinessCard = selectBusinessCard
    .omit({ fileId: true, vcfFileId: true, profilePhotoFileId: true })
    .extend({
        url: z.string().nullable(),
        vcfUrl: z.string().nullable(),
        profilePhotoUrl: z.string().nullable(),
        emails: z.array(selectBusinessCardEmail),
        websites: z.array(selectBusinessCardWebsite),
        phones: z.array(selectBusinessCardPhone),
    })
