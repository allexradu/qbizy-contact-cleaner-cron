import type { Env } from '@const/types'
import { businessCardContact, file } from '@db/schema.ts'
import { inArray, lt } from 'drizzle-orm'
import { sql } from 'drizzle-orm/sql'
import { Db } from '@db/db.ts'

import { deleteCDNFile } from '@utils/delete-c-d-n-file.ts'

console.log('🔸 Worker module loaded')

interface DeleteFilePayload {
    fileId: string
    fileName: string
}

export default {
    async scheduled(event: ScheduledEvent, env: Env, ctx: ExecutionContext) {
        console.log('⏰ Scheduled task started')

        const dbInstance = Db.getInstance(env)
        const db = dbInstance.getDb()

        const expiredContacts = await db
            .select({
                vcfQrCodeFileId: businessCardContact.vcfQrCodeFileId,
            })
            .from(businessCardContact)
            .where(
                lt(
                    businessCardContact.expires,
                    sql`timezone('UTC', CURRENT_TIMESTAMP)`,
                ),
            )
            .execute()

        await db
            .delete(businessCardContact)
            .where(
                lt(
                    businessCardContact.expires,
                    sql`timezone('UTC', CURRENT_TIMESTAMP)`,
                ),
            )

        const fileIdsToDelete = expiredContacts
            .map((contact) => contact.vcfQrCodeFileId)
            .filter((id): id is string => id !== null)

        const files = db
            .select()
            .from(file)
            .where(inArray(file.id, fileIdsToDelete))

        const deleteFilePayloads: DeleteFilePayload[] = (await files).map(
            (f) => ({
                fileId: f.fileId,
                fileName: f.fileName,
            }),
        )

        await Promise.all(
            deleteFilePayloads.map(async (file) => {
                try {
                    console.log(`Deleting file: ${file.fileName}`)
                    await deleteCDNFile(env, file.fileId, file.fileName)
                } catch (error) {
                    console.error(
                        `Error deleting file ${file.fileName}:`,
                        error,
                    )
                }
            }),
        )

        await db.delete(file).where(inArray(file.id, fileIdsToDelete))

        console.log('Deleted expired contacts:', expiredContacts.length)

        console.log('✅ Scheduled task completed')
    },
}
