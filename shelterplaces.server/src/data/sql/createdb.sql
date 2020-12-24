CREATE DATABASE cliffdivingsitesdev;
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE location (
   id uuid PRIMARY KEY,
   user_id uuid NOT NULL,
   lat double precision NOT NULL,
   lng double precision NOT NULL,
   display_name varchar(255) NOT NULL,
   title varchar(100) NOT NULL,
   description text NOT NULL
);
