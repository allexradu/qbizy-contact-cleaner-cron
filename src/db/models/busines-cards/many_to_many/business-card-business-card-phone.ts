import { pgTable, uuid } from 'drizzle-orm/pg-core'
import {businessCard} from "@db/models/busines-cards/business-cards";
import {businessCardPhone} from "@db/models/busines-cards/business-card-phone";


export const businessCardBusinessCardPhone = pgTable('business_card_business_card_phone', {
    businessCardId: uuid('business_card_id')
        .notNull()
        .references(() => businessCard.id),
    phoneId: uuid('phone_id')
        .notNull()
        .references(() => businessCardPhone.id),
})
