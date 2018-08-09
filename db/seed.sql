-- TO DELETE TABLES
DROP TABLE IF EXISTS visits;
DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS family_roles;
DROP TABLE IF EXISTS roles;
DROP TABLE IF EXISTS families;

-- SCHEMA SEED
CREATE TABLE families (
    id SERIAL PRIMARY KEY,
    family_name VARCHAR(250)
);

CREATE TABLE roles(
	id SERIAL PRIMARY KEY,
	role_name VARCHAR(250)
);

CREATE TABLE family_roles(
	id SERIAL PRIMARY KEY,
	role_name VARCHAR(250)
);

CREATE TABLE users (
	id SERIAL PRIMARY KEY,
	family_id INTEGER REFERENCES families(id),
	role_id INTEGER REFERENCES roles(id),
	family_role_id INTEGER REFERENCES family_roles(id),
	name VARCHAR(250),
	email VARCHAR(500),
	phone VARCHAR(25),
	password VARCHAR(1000)
);

CREATE TABLE visits (
	id SERIAL PRIMARY KEY,
	user_id INTEGER REFERENCES users(id),
	start_date TIMESTAMPTZ,
	end_date TIMESTAMPTZ,
	memo VARCHAR(2000),
	total_days INTEGER,
	generator_hours FLOAT,
	green_4x4_days INTEGER,
	green_4x4_miles FLOAT,
	yellow_4x4_days INTEGER,
	yellow_4x4_miles FLOAT,
	total_cost FLOAT,
	check_sent BOOLEAN,
	check_received BOOLEAN
);
	
-- DATA SEED
INSERT INTO families
(family_name)
VALUES
('Scott Haynes'),
('Rich Haynes'),
('Robin Bloomfield'),
('Dana Albrectson'),
('Kris Hass');

INSERT INTO roles
(role_name)
VALUES
('admin'),
('user');

INSERT INTO family_roles
(role_name)
VALUES
('sibling'),
('child'),
('grandchild');

INSERT INTO users
(name, family_id, role_id, family_role_id)
VALUES
('Drew Bloomfield', 3, 1, 2),
('Scott Haynes', 1, 2, 1),
('Preston Haynes', 1, 2, 2),
('Mark Haynes', 1, 2, 2),
('Brad Haynes', 1, 2, 2),
('Paige Wardle', 1, 2, 2),
('Rich Haynes', 2, 2, 1),
('Alexandra Haynes', 2, 2, 2),
('Matthew Haynes', 2, 2, 2),
('Scott(ie) Haynes', 2, 2, 2),
('Rachel Miller', 2, 2, 2),
('Robin Bloomfield', 3, 2, 1),
('Tara Butler', 3, 2, 2),
('Ben Bloomfield', 3, 2, 2),
('Katie Lemke', 3, 2, 2),
('Jennifer Mooney', 3, 2, 2);