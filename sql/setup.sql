DROP TABLE IF EXISTS users CASCADE;
DROP TABLE IF EXISTS favorites CASCADE;
DROP TABLE IF EXISTS images CASCADE;

CREATE TABLE users (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    name TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE,
    password_hash TEXT NOT NULL
);

CREATE TABLE favorites (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    user_email TEXT NOT NULL REFERENCES users(email),
    facility_id TEXT NOT NULL UNIQUE,
    facility_name TEXT NOT NULL,
    facility_description TEXT,
    facility_directions TEXT,
    facility_phone TEXT,
    facility_email TEXT,
    reservable BOOLEAN 
);

CREATE TABLE images (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    favorites_facility_id TEXT NOT NULL REFERENCES favorites(facility_id),
    url TEXT NOT NULL
)






