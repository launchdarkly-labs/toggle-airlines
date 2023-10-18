CREATE TABLE IF NOT EXISTS "users" (
	"id" serial PRIMARY KEY NOT NULL,
	"flight_number" text,
	"origin" text,
	"destination" text,
	"flight_status" text
);
