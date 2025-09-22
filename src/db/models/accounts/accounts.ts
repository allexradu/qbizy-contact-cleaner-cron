import {
    boolean,
    pgTable,
    text,
    timestamp,
    uuid,
    varchar,
} from 'drizzle-orm/pg-core'
import { z } from 'zod'
import { AccountType } from '@const/accounts'
import { sql } from 'drizzle-orm/sql'
import { country } from '@db/models/core/country'

export const account = pgTable('accounts', {
    id: uuid('id').primaryKey().defaultRandom(),
    username: varchar('username', { length: 255 }).unique(),
    firstName: varchar('first_name', { length: 255 }),
    lastName: varchar('last_name', { length: 255 }),
    email: varchar('email', { length: 255 }).notNull().unique(),
    password: varchar('password', { length: 255 }).notNull(),
    phoneNumber: varchar('phone_number', { length: 255 }).default(sql`NULL`),
    type: varchar('type', { length: 255 })
        .notNull()
        .default(AccountType.ACCOUNT),
    isActive: boolean('is_active').notNull().default(false),
    isEmailConfirmed: boolean('is_email_confirmed').notNull().default(false),
    isPhoneConfirmed: boolean('is_phone_confirmed').notNull().default(false),
    countryId: uuid('country_id').references(() => country.id),
    dateOfBirth: timestamp('date_of_birth'),
    createdAt: timestamp('created_at')
        .default(
            sql`timezone
        ('UTC', CURRENT_TIMESTAMP)`,
        )
        .notNull(),
    lastLogin: timestamp('last_login')
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
    deactivatedAt: timestamp('deactivated_at').default(sql`NULL`),
    deactivatedReason: text('deactivated_reason').default(sql`NULL`),
    marketingConsent: boolean('marketing_consent').default(false),
})

export const selectAccountSchema = z.object({
    id: z.string(),
    username: z.string().nullable(),
    firstName: z.string().nullable(),
    lastName: z.string().nullable(),
    email: z.string(),
    type: z.string(),
    phoneNumber: z.string().nullable(),
    isActive: z.boolean(),
    isEmailConfirmed: z.boolean(),
    isPhoneConfirmed: z.boolean(),
    countryCode: z.string().nullable(),
    dateOfBirth: z.date().nullable(),
    createdAt: z.date(),
    lastLogin: z.date(),
    lastUpdated: z.date(),
    deactivatedAt: z.string().nullable(),
    deactivatedReason: z.string().nullable(),
    marketingConsent: z.boolean().nullable(),
})

export const loginSchema = z.object({
    email: z.string().min(3).email().toLowerCase(),
    password: z.string().min(8),
})

export const insertRegisterAccountSchema = z.object({
    email: z.string().min(5).email().toLowerCase(),
    password: z.string().min(8),
    marketingConsent: z.boolean(),
})
