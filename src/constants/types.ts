export interface Env {
    DATABASE_URL: string
    BACKBLAZE_KEY_ID: string
    BACKBLAZE_APPLICATION_KEY: string
}

export enum AccountConfirmationMethod {
    EMAIL = 'email',
    PHONE = 'phone',
}

export enum AccountConfirmationType {
    ACCOUNT_CONFIRMATION = 'account_confirmation',
    RESET_PASSWORD = 'reset_password',
}
