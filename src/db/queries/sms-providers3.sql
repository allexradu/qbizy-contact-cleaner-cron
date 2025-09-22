SELECT
    c.code,
    MAX(CASE WHEN p.name = 'Twillio' THEN s.price

     * (
    SELECT conversion_rate from currencies cr where cr.code = 'USD' LIMIT 1
    )

    END) AS twillio,
    MAX(CASE WHEN p.name = 'GatewayAPI' THEN s.price END) AS GatewayAPI
FROM countries c
LEFT JOIN sms_verification_prices s ON c.id = s.country_id
LEFT JOIN sms_providers p ON s.provider_id = p.id
GROUP BY c.code
ORDER BY GatewayAPI DESC;
