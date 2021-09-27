DROP TABLE IF EXISTS weight;
DROP TABLE IF EXISTS ability;

CREATE TABLE weight (
    id SERIAL PRIMARY KEY,
    pokemon TEXT NOT NULL,
    pounds INTEGER NOT NULL
);
CREATE TABLE ability (
    id SERIAL PRIMARY KEY,
    pokemon TEXT NOT NULL,
    powers TEXT NOT NULL
)