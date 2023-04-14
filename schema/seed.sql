USE toot_app_db;

INSERT INTO roles (role)
VALUES
    ("Management"),
    ("Brewhouse"),
    ("Tap Room");

INSERT INTO employees (first_name, last_name, role_id, username, password)
VALUES 
    ("Daniella", "Manager", 1, "d.manager", "$2b$10$IolbONJDbx/rG9MRyfrmsOScXFd8Tzai7JJwNRdEOdfRwTBB67O3K"),
    ("Daniella", "Brewhouse", 2, "d.brewhouse", "$2b$10$wvqUQxubaNfYRey0I/WSJuRlTmWmKr42nv3gZUAeceiVoN3GRb6Y6"),
    ("Daniella", "Taproom", 3, "d.taproom", "$2b$10$eb7GiMovBoNbWjtK4iNGku0zXBOxfP6MeIdC4EPk3fIyytRKdb50O"),
    ("Matt", "Manager", 1, "m.manager", "$2b$10$uLF7vwTlmRFjw6rnFwQYEuNRCb0nPwygEtm9BVJieuBCSJvugMBoq"),
    ("Matt", "Brewhouse", 2, "m.brewhouse", "$2b$10$bm7vx6xnqOo8xkNnwWClNOTSemIJMkHVeEp.mGWtftGFn7O9YJ7lq"),
    ("Matt", "Taproom", 3, "m.taproom", "$2b$10$bm7vx6xnqOo8xkNnwWClNOTSemIJMkHVeEp.mGWtftGFn7O9YJ7lq");

INSERT INTO inventory (name, category, style, ibu, srm, abv, brewed_date)
VALUES 
    ("Pale Ale", "American Pale Ale", "American Pale Ale", 5, 5, 5, "4/12/2023"),
    ("Ipa", "Ipa", "Amber Bitter European Beer", 5, 5, 5, "4/12/2023"),
    ("Czech Lager", "Czech Lager", "Czech Pale Lager", 5, 5, 5, "4/12/2023"),
    ("Belgian Ale", "Belgian Ale", "Belgian Ale", 5, 5, 5, "4/12/2023"),
    ("Cream Ale", "Cream Ale", "Cream Ale", 5, 5, 5, "4/12/2023"),
    ("Festbier", "Festbier", "Festbier", 5, 5, 5, "4/12/2023"),
    ("Pilsner", "Pilsner", "Pilsner", 5, 5, 5, "4/12/2023"),
    ("Light Lager", "Light Lager", "Light Lager", 5, 5, 5, "4/12/2023"),
    ("Kolsch", "Kolsch", "Kolsch", 5, 5, 5, "4/12/2023"),
    ("Saison", "Saison", "Saison", 5, 5, 5, "4/12/2023"),
    ("Munich Helles", "Munich Helles", "Munich Helles", 5, 5, 5, "4/12/2023"),
    ("Irish Stout", "Irish Stout", "Irish Stout", 5, 5, 5, "4/12/2023"),
    ("Lambic", "Lambic", "Lambic", 5, 5, 5, "4/12/2023"),
    ("Marzen", "Marzen", "Marzen", 5, 5, 5, "4/12/2023"),
    ("Altbier", "Altbier", "Altbier", 5, 5, 5, "4/12/2023"),
    ("Double Ipa", "Double Ipa", "Double Ipa", 5, 5, 5, "4/12/2023"),
    ("English Ipa", "English Ipa", "English Ipa", 5, 5, 5, "4/12/2023"),
    ("Baltic Porter", "Baltic Porter", "Baltic Porter", 5, 5, 5, "4/12/2023"),
    ("Belgian Dubbel", "Belgian Dubbel", "Belgian Dubbel", 5, 5, 5, "4/12/2023"),
    ("Blonde Ale", "Blonde Ale", "Blonde Ale", 5, 5, 5, "4/12/2023");

INSERT INTO on_tap (tap_name)
VALUES
    ("tap_1"),
    ("tap_2"),
    ("tap_3"),
    ("tap_4"),
    ("tap_5"),
    ("tap_6"),
    ("tap_7"),
    ("tap_8"),
    ("tap_9"),
    ("tap_10");

INSERT INTO next_on_tap (tap_name)
VALUES
    ("tap_1"),
    ("tap_2"),
    ("tap_3"),
    ("tap_4"),
    ("tap_5"),
    ("tap_6"),
    ("tap_7"),
    ("tap_8"),
    ("tap_9"),
    ("tap_10");
    

