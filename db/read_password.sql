SELECT password, id
FROM users
WHERE email ILIKE $1;