SELECT
    c.name AS country_name,
     MAX(CASE WHEN p.name = 'Twillio' THEN s.price END) AS twillio,
    MAX(CASE WHEN p.name = 'Twillio' THEN s.price

    * (
    SELECT conversion_rate from currencies cr where cr.code = 'USD' LIMIT 1
    )

    END) AS twillio_eur,
    MAX(CASE WHEN p.name = 'GatewayAPI' THEN s.price END) AS gatewayapi
FROM countries c
LEFT JOIN sms_verification_prices s ON c.id = s.country_id
LEFT JOIN sms_providers p ON s.provider_id = p.id
WHERE c.code = 'RO'
GROUP BY c.name
ORDER BY c.name;
