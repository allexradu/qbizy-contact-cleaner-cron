import { pgTable, uuid, varchar } from 'drizzle-orm/pg-core'

export const file = pgTable('files', {
    id: uuid('id').primaryKey().defaultRandom(),
    fileName: varchar('name', { length: 1000 }).notNull(),
    bucketName: varchar('bucket_name', { length: 255 }).notNull(),
    bucketId: varchar('bucket_id', { length: 255 }).notNull(),
    fileId: varchar('file_id', { length: 255 }).notNull(),
    fileCategory: varchar('file_category', { length: 255 }),
    fileType: varchar('file_type', { length: 255 }),
    url: varchar('url', { length: 1000 }).notNull(),
})
