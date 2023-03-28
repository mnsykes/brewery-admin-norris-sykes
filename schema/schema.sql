USE toot_app_db;

CREATE TABLE roles (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    role VARCHAR(30) NOT NULL
);


CREATE TABLE employees (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    role_id INT NOT NULL,
    username VARCHAR(50) NOT NULL UNIQUE,
    password VARCHAR(200) NOT NULL,
    FOREIGN KEY (role_id)
        REFERENCES roles (id)
);

CREATE TABLE requests (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  requestor_id INT NOT NULL,
  style VARCHAR(100) NOT NULL,
  notes VARCHAR(200),
  request_date VARCHAR(50),
  approver_id INT,
  approval_date VARCHAR(50),
  FOREIGN KEY (approver_id)
    REFERENCES employees (id)
);
