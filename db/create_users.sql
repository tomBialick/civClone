-- Run this to set up the postgresql database table
-- Should only need to be ran once

--Drop table(s) before making

DROP TABLE USERS;

CREATE TABLE USERS(
      ID        INT          NOT NULL,
      USERNAME  VARCHAR(255) NOT NULL,
      PASSWORD  VARCHAR(255) NOT NULL,
      PRIMARY KEY (ID)
);
