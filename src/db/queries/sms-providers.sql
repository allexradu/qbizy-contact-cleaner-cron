SELECT
    c.name AS country_name,
    MAX(CASE WHEN p.name = 'Twillio' THEN s.price END) AS Twillio,
    MAX(CASE WHEN p.name = 'GatewayAPI' THEN s.price END) AS GatewayAPI
FROM countries c
LEFT JOIN sms_verification_prices s ON c.id = s.country_id
LEFT JOIN sms_providers p ON s.provider_id = p.id
GROUP BY c.name
ORDER BY c.name;
SELECT
    c.name AS country_name,
    MAX(CASE WHEN p.name = 'Twillio' THEN s.price END) AS Twillio,
    MAX(CASE WHEN p.name = 'GatewayAPI' THEN s.price END) AS GatewayAPI
FROM countries c
LEFT JOIN sms_verification_prices s ON c.id = s.country_id
LEFT JOIN sms_providers p ON s.provider_id = p.id
GROUP BY c.name
ORDER BY c.name;
