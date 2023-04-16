CREATE DATABASE IF NOT EXISTS toot_app_db;

USE toot_app_db;

CREATE TABLE roles (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    role VARCHAR(30) NOT NULL,
    is_manager BOOLEAN,
    is_brewhouse BOOLEAN,
    is_taproom BOOLEAN
);

CREATE TABLE security_questions (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  question VARCHAR(100)
);

CREATE TABLE employees (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    email VARCHAR(100),
    role_id INT NOT NULL,
    username VARCHAR(50) NOT NULL UNIQUE,
    password VARCHAR(200) NOT NULL,
    question_id INT,
    security_answer VARCHAR(200),
    FOREIGN KEY (role_id)
        REFERENCES roles (id),
    FOREIGN KEY (question_id)
        REFERENCES security_questions (id)
);

CREATE TABLE requests (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  requestor_id INT NOT NULL,
  style VARCHAR(100) NOT NULL,
  notes VARCHAR(200),
  request_date VARCHAR(50)
);

CREATE TABLE approvals (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    approver_id INT NOT NULL,
    approval_date VARCHAR(50) NOT NULL,
    request_id INT NOT NULL,
    is_approved BOOLEAN,
    FOREIGN KEY (request_id)
      REFERENCES requests (id)
);

CREATE TABLE inventory (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    category VARCHAR(50) NOT NULL,
    style VARCHAR(50) NOT NULL,
    ibu INT NOT NULL,
    srm INT NOT NULL,
    abv INT NOT NULL,
    brewed_date VARCHAR(30)
);

CREATE TABLE on_tap (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    tap_name VARCHAR(15),
    beer_id INT,
    date_added VARCHAR(50),
    date_removed VARCHAR(50),
    added_by INT,
    removed_by INT,
    FOREIGN KEY (added_by)
      REFERENCES employees (id),
    FOREIGN KEY (removed_by)
      REFERENCES employees (id),
    FOREIGN KEY (beer_id)
      REFERENCES inventory (id)
);

CREATE TABLE next_on_tap (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    tap_name VARCHAR(15),
    beer_id INT,
    date_added VARCHAR(50),
    date_removed VARCHAR(50),
    added_by INT,
    removed_by INT,
    FOREIGN KEY (added_by)
      REFERENCES employees (id),
    FOREIGN KEY (removed_by)
      REFERENCES employees (id),
    FOREIGN KEY (beer_id)
      REFERENCES inventory (id)
);


