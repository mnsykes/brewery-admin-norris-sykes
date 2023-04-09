USE toot_app_db;

INSERT INTO roles (role)
VALUES
    ("Management"),
    ("Brewhouse"),
    ("Tap Room");

INSERT INTO employees (first_name, last_name, role_id,username, password)
VALUES ("daniella", "norris","Management","banana", "$2b$10$/1UfZvXYrToAGa5mO1IbfesmFQJ42WIlI60swCyafhzrB/2KcD1RK");