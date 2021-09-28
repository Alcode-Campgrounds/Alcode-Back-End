DROP TABLE IF EXISTS weight;
DROP TABLE IF EXISTS ability;
DROP TABLE IF EXISTS height;
DROP TABLE IF EXISTS bender;

CREATE TABLE weight (
    id SERIAL PRIMARY KEY,
    pokemon TEXT NOT NULL,
    pounds INTEGER NOT NULL
);
CREATE TABLE ability (
    id SERIAL PRIMARY KEY,
    pokemon TEXT NOT NULL,
    powers TEXT NOT NULL
);
CREATE TABLE height (
    id SERIAL PRIMARY KEY,
    pokemon TEXT NOT NULL,
    length INTEGER NOT NULL
);
CREATE TABLE bender (
    id SERIAL PRIMARY KEY,
    character TEXT NOT NULL,
    quote TEXT NOT NULL
)