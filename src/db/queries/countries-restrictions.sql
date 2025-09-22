SELECT
    c.name, c.code AS country_code, c.apple, c.google, c.paypal, c.disabled, c.disabled_reason, c.paid_membership_only, c.paid_verification_only,
    MAX(CASE WHEN p.name = 'Twillio' THEN s.price

    * (
    SELECT conversion_rate from currencies cr where cr.code = 'USD' LIMIT 1
    )

    END) AS Twillio,
    MAX(CASE WHEN p.name = 'GatewayAPI' THEN s.price END) AS GatewayAPI
FROM countries c
LEFT JOIN sms_verification_prices s ON c.id = s.country_id
LEFT JOIN sms_providers p ON s.provider_id = p.id
WHERE c.disabled = TRUE
GROUP BY c.name, c.code,c.apple, c.google, c.paypal, c.disabled, c.disabled_reason, c.paid_membership_only, c.paid_verification_only
ORDER BY c.code ASC;
