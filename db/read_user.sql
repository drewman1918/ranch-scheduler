SELECT id, family_id, role_id, family_role_id
FROM users
WHERE id = $1;