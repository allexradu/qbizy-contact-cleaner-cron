import { pgTable, uuid } from 'drizzle-orm/pg-core'
import { businessCard } from '@db/models/busines-cards/business-cards'
import { businessCardWebsite } from '@db/models/busines-cards/business-card-website'

export const businessCardBusinessCardWebsite = pgTable(
    'business_card_business_card_website',
    {
        businessCardId: uuid('business_card_id')
            .notNull()
            .references(() => businessCard.id),
        websiteId: uuid('website_id')
            .notNull()
            .references(() => businessCardWebsite.id),
    },
)
