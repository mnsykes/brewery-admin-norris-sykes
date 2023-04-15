USE toot_app_db;

INSERT INTO roles (role)
VALUES
    ("Management"),
    ("Brewhouse"),
    ("Tap Room");

INSERT INTO employees (first_name, last_name, role_id, username, password)
VALUES 
    ("Matt", "Manager", 1, "m.manager", "$2b$10$uLF7vwTlmRFjw6rnFwQYEuNRCb0nPwygEtm9BVJieuBCSJvugMBoq"),
    ("Daniella", "Manager", 1, "d.manager", "$2b$10$IolbONJDbx/rG9MRyfrmsOScXFd8Tzai7JJwNRdEOdfRwTBB67O3K");

