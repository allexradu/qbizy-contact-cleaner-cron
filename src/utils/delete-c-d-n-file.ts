import { Buffer } from 'buffer'
import type { Env } from '@const/types'

export interface AuthResponse {
    apiUrl: string
    authorizationToken: string
    downloadUrl: string
    accountId: string
}

export async function authenticate(env: Env): Promise<AuthResponse> {
    const authEncoded = Buffer.from(
        `${env.BACKBLAZE_KEY_ID}:${env.BACKBLAZE_APPLICATION_KEY}`,
    ).toString('base64')
    const authResponse = await fetch(
        'https://api.backblazeb2.com/b2api/v2/b2_authorize_account',
        {
            headers: {
                Authorization: `Basic ${authEncoded}`,
            },
        },
    )

    if (!authResponse.ok) {
        throw new Error(
            `Authorization failed: ${authResponse.status} ${authResponse.statusText}`,
        )
    }

    return (await authResponse.json()) as AuthResponse
}

export async function deleteCDNFile(
    env: Env,
    remoteFileId: string,
    remoteFileName: string,
): Promise<void> {
    const authResponse = await authenticate(env)
    const deleteUrl = `${authResponse.apiUrl}/b2api/v2/b2_delete_file_version`

    const response = await fetch(deleteUrl, {
        method: 'POST',
        headers: {
            Authorization: authResponse.authorizationToken,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            fileId: remoteFileId,
            fileName: remoteFileName,
        }),
    })

    if (!response.ok) {
        throw new Error(
            `Failed to delete file: ${response.status} ${response.statusText}`,
        )
    }
}
