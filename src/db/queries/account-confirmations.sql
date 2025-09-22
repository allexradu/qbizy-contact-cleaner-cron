SELECT ac.*, c.name, p.name FROM account_confirmations ac
LEFT JOIN countries c on ac.country_id = c.id
LEFT JOIN sms_providers p on ac.provider_id = p.id
