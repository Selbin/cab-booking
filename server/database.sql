CREATE TABLE "trip" (
  "trip_id" SERIAL PRIMARY KEY NOT NULL,
  "cab_id" integer NOT NULL,
  "user_id" integer NOT NULL,
  "lat" varchar NOT NULL,
  "lon" varchar NOT NULL,
  "start_time" timestampz NOT NULL,
  "end_time" timestampz NOT NULL,
  "end_lat" varchar NOT NULL,
  "end_long" varchar NOT NULL,
  "cost" numeric NOT NULL
);

CREATE TABLE "cab" (
  "cab_id" SERIAL PRIMARY KEY NOT NULL,
  "lat" varchar NOT NULL,
  "lon" varchar NOT NULL,
  "color" varchar(10) NOT NULL,
  "available" boolean NOT NULL
);

CREATE TABLE "user" (
  "user_id" SERIAL PRIMARY KEY NOT NULL,
  "email" email NOT NULL,
  "password" password NOT NULL,
  "phone_no" numeric NOT NULL,
  "name" varchar(20) NOT NULL
);

ALTER TABLE "trip" ADD FOREIGN KEY ("cab_id") REFERENCES "cab" ("cab_id");

ALTER TABLE "trip" ADD FOREIGN KEY ("user_id") REFERENCES "user" ("user_id");