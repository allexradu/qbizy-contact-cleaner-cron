import { pgTable, uuid } from 'drizzle-orm/pg-core'
import {businessCard} from "@db/models/busines-cards/business-cards";
import {businessCardEmail} from "@db/models/busines-cards/business-card-email";


export const businessCardBusinessCardEmail = pgTable('business_card_business_card_email', {
    businessCardId: uuid('business_card_id')
        .notNull()
        .references(() => businessCard.id),
    emailId: uuid('email_id')
        .notNull()
        .references(() => businessCardEmail.id),
})
