CREATE DATABASE cliffdivingsitesdev;
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE location (
   id uuid DEFAULT uuid_generate_v4() PRIMARY KEY,
   user_id uuid NOT NULL,
   lat double precision NOT NULL,
   lng double precision NOT NULL,
   display_name varchar(50) NOT NULL,
   title varchar(50) NOT NULL,
   description varchar(100) NOT NULL
);
