CREATE DATABASE IF NOT EXISTS toot_app_db;

USE toot_app_db;

CREATE TABLE requests (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    style VARCHAR(50),
    requestor VARCHAR(50),
    notes VARCHAR(50),
    request_date VARCHAR(50)
);
