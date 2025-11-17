CREATE TABLE users (
	id SERIAL PRIMARY KEY,
	username VARCHAR(50) NOT NULL,
	password VARCHAR(50) NOT NULL
);

CREATE TABLE goals (
	id SERIAL PRIMARY KEY,
	user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
	dailyGoal VARCHAR(250),
	shortGoal VARCHAR(250),
	longGoal VARCHAR(250)
);

INSERT INTO users (username, password) VALUES ('Leo', '1234');
INSERT INTO goals (user_id, dailyGoal) VALUES (1, 'Learn about foreign and primary keys in postgres');
INSERT INTO goals (user_id, shortGoal) VALUES (1, 'Finish my parts in ITI 200 final project');
INSERT INTO goals (user_id, longGoal) VALUES (1, 'Graduate from UMFlint');