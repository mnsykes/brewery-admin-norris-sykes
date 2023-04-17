USE toot_app_db;

INSERT INTO roles (role, is_manager, is_brewhouse, is_taproom)
VALUES
    ("Management", true, false, false),
    ("Brewhouse", false, true, false),
    ("Tap Room", false, false, true);

INSERT INTO security_questions (question)
VALUES
    ("In what city did you meet your spouse/significant other?"),
    ("What is the middle name of your youngest child?"),
    ("What was the name of your first stuffed animal?"),
    ("In what city or town did your mother and father meet?");

INSERT INTO employees (first_name, last_name, email, role_id, username, password, question_id, security_answer)
VALUES 
    -- PW: manager
    -- Employee Id: 1
    -- Security question: 1
    -- Security answer: los angeles
    ("Daniella", "Manager", "d.manager@toot.com", 1, "d.manager", "$2b$10$IolbONJDbx/rG9MRyfrmsOScXFd8Tzai7JJwNRdEOdfRwTBB67O3K", 1, "$2b$10$oZqywr4cosFw75PLzYRAEeRAK7yVSh/R6REY0klTc3C/Rc/2kdn2a"),
    -- PW: brewhouse
    -- Employee Id: 2
    -- Security question: 2
    -- Security answer: jane
    ("Daniella", "Brewhouse", "d.brewhouse@toot.com", 2, "d.brewhouse", "$2b$10$wvqUQxubaNfYRey0I/WSJuRlTmWmKr42nv3gZUAeceiVoN3GRb6Y6", 2, "$2b$10$QpZALTLkKA1zINFa1qVxw.4ZNJ6z3pnON2sSI7RmjGvoa42w/WPt2"),
    -- PW: taproom
    -- Employee Id: 3
    -- Security question: 3
    -- Security answer: monkey
    ("Daniella", "Taproom", "d.taproom@toot.com", 3, "d.taproom", "$2b$10$eb7GiMovBoNbWjtK4iNGku0zXBOxfP6MeIdC4EPk3fIyytRKdb50O", 3, "$2b$10$uxLivrVpAnj.iqu3RkWj/eMEKG5feK/Zawb6vSqxNnKriADwpfBSy"),
    -- PW: manager
    -- Employee Id: 4
    -- Security question: 1
    -- Security answer: los angeles
    ("Matt", "Manager", "m.manager@toot.com", 1, "m.manager", "$2b$10$uLF7vwTlmRFjw6rnFwQYEuNRCb0nPwygEtm9BVJieuBCSJvugMBoq", 1, "$2b$10$oZqywr4cosFw75PLzYRAEeRAK7yVSh/R6REY0klTc3C/Rc/2kdn2a"),
    -- PW: brewhouse
    -- Employee Id: 5
    -- Security question: 2
    -- Security answer: jane
    ("Matt", "Brewhouse", "m.brewhouse@toot.com", 2, "m.brewhouse", "$2b$10$EO6qHj5NT14M4vHFnt1xEeiHQrrl20dqE/qf3toUf7rj8Ll96MpyO", 2, "$2b$10$QpZALTLkKA1zINFa1qVxw.4ZNJ6z3pnON2sSI7RmjGvoa42w/WPt2"),
    -- PW: taproom
    -- Employee Id: 6
    -- Security question: 3
    -- Security answer: monkey
    ("Matt", "Taproom", "m.taproom@toot.com", 3, "m.taproom", "$2b$10$bm7vx6xnqOo8xkNnwWClNOTSemIJMkHVeEp.mGWtftGFn7O9YJ7lq", 3, "$2b$10$uxLivrVpAnj.iqu3RkWj/eMEKG5feK/Zawb6vSqxNnKriADwpfBSy");

INSERT INTO inventory (name, category, style, ibu, srm, abv, brewed_date)
VALUES 
    ("72", "Pale Ale", "American Pale Ale", 40, 4, 6, "4/12/2023"),
    ("Ursa", "Ipa", "American Ipa", 60, 5, 7, "4/12/2023"),
    ("True True", "Belgian", "Belgian Dubbel", 5, 5, 5, "4/12/2023"),
    ("Wakulla", "German", "Hefeweizen", 12, 5, 6, "4/12/2023"),
    ("Drift", "English", "Mild Brown Ale", 20, 5, 5, "4/12/2023"),
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
    ("1"),
    ("2"),
    ("3"),
    ("4"),
    ("5"),
    ("6"),
    ("7"),
    ("8"),
    ("9"),
    ("10");

INSERT INTO next_on_tap (tap_name)
VALUES
    ("1"),
    ("2"),
    ("3"),
    ("4"),
    ("5"),
    ("6"),
    ("7"),
    ("8"),
    ("9"),
    ("10");
    

