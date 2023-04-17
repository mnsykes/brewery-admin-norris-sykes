# brewery-admin-norris-sykes
### link to site: https://brewery-admin.herokuapp.com/
## created by matthew sykes and daniella norris 

### this beer application is intended for internal brewery use, with different login permissions for management, brewers, and staff. 

## how it works: 
- The application is intended for internal use by a fictional brewery team at TOOT. 
- There are 3 tiers for employees, with varying permissions:
  - role_id = 1 corresponds to manager. this individual can access all application elements, can add/delete employees, and can update the tap list.
    - to test:
      - username : d.manager
      - password : manager
  - role_id = 2 corresponds to brewhouse. these individuals do not share the same permissions.
    - to test:
      - username : d.brewhouse
      - password : brewhouse
  - role_id = 3 corresponds to taproom; these employees do not have as many permissions as management. 
    - to test:
      - username : d.taproom
      - password : taproom
- Handlebars templates are used to dynamically serve data from the sql database and the javascript files. The handlebars templates can be found in the /views folder.
- api routes and static html routes are found within the /routes folder. 
- for developers, terminal commands can be found in the package.json file located in the root folder.
- the tap plan page allows management to plan out what goes on tap next, as well as what is on tap now. tap information can be deleted as needed. 
- the requests page allows users to request styles and add comments. when the style is approved by a manager, the buttons become disabled.
- the employees page allows management to add and delete employees.
- the update employees page allows users to update their information.
- the style search page searches for beer styles and produces corresponding images and an ai image to fit the style.

### there are 3 main data sources used for this application:

- AI image generation using Open Source API
  -  The AI is pulled from Open AI, a downloaded module within node_modules. Random images are prompted to generate upon form submission on the stylesearch page, with "in a glass with an art deco background" concetaded to the name of the beer that was selected. Due to the longer loading time for the AI generation,  a loading bar is placed on the page as the image generates. 
- A beer style guideline JSON API from Github
  - This JSON is technically for educational use only, with the information provided by BCJB and the JSON file derived from:
   const apiurl = `https://raw.githubusercontent.com/ascholer/bjcp-styleview/main/styles.json`;
- A SQL database containing requests, roles, and employees
  - located in schema/schema.sql route. 
  -  the database used is toot_app_db. visually, the sql tables appear as so:   

        employees:
        | id | first_name | last_name | role_id | username  | password                                                     |
        |----|------------|-----------|---------|-----------|--------------------------------------------------------------|
        | 1  | Matt       | Manager   | 1       | m.manager | protected |
        | 2  | Daniella   | Manager   | 1       | d.manager | protected |

        roles:

        | id | role       |
        |----|------------|
        | 1  | Management |
        | 2  | Brewhouse  |
        | 3  | Tap Room   |

        requests:

        | id | requestor_id | style | notes     | request_date | approver_id | approval_date |
        |----|--------------|-------|-----------|--------------|-------------|---------------|
        | 2  | 1            | lager | need asap | 4/2          | 2           | 4/3           |

        security_questions:

        | id | question                                                 |
        |----|----------------------------------------------------------|
        | 1  | In what city did you meet your spouse/significant other? |
        | 2  | What is the middle name of your youngest child?          |
        | 3  | What was the name of your first stuffed animal?          |
        | 4  | In what city or town did your mother and father meet?    |

        inventory:

        | id | name           | category       | style             | ibu | srm | abv | brewed_date |
        |----|----------------|----------------|-------------------|-----|-----|-----|-------------|
        | 1  | 72             | Pale Ale       | American Pale Ale | 40  | 4   | 6   | 4/12/2023   |
        | 2  | Ursa           | Ipa            | American Ipa      | 60  | 5   | 7   | 4/12/2023   |
        | 3  | True True      | Belgian        | Belgian Dubbel    | 5   | 5   | 5   | 4/12/2023   |
        | 4  | Wakulla        | German         | Hefeweizen        | 12  | 5   | 6   | 4/12/2023   |
        | 5  | Drift          | English        | Mild Brown Ale    | 20  | 5   | 5   | 4/12/2023   |
        | 6  | Festbier       | Festbier       | Festbier          | 5   | 5   | 5   | 4/12/2023   |
        | 7  | Pilsner        | Pilsner        | Pilsner           | 5   | 5   | 5   | 4/12/2023   |
        | 8  | Light Lager    | Light Lager    | Light Lager       | 5   | 5   | 5   | 4/12/2023   |
        | 9  | Kolsch         | Kolsch         | Kolsch            | 5   | 5   | 5   | 4/12/2023   |
        | 10 | Saison         | Saison         | Saison            | 5   | 5   | 5   | 4/12/2023   |
        | 11 | Munich Helles  | Munich Helles  | Munich Helles     | 5   | 5   | 5   | 4/12/2023   |
        | 12 | Irish Stout    | Irish Stout    | Irish Stout       | 5   | 5   | 5   | 4/12/2023   |
        | 13 | Lambic         | Lambic         | Lambic            | 5   | 5   | 5   | 4/12/2023   |
        | 14 | Marzen         | Marzen         | Marzen            | 5   | 5   | 5   | 4/12/2023   |
        | 15 | Altbier        | Altbier        | Altbier           | 5   | 5   | 5   | 4/12/2023   |
        | 16 | Double Ipa     | Double Ipa     | Double Ipa        | 5   | 5   | 5   | 4/12/2023   |
        | 17 | English Ipa    | English Ipa    | English Ipa       | 5   | 5   | 5   | 4/12/2023   |
        | 18 | Baltic Porter  | Baltic Porter  | Baltic Porter     | 5   | 5   | 5   | 4/12/2023   |
        | 19 | Belgian Dubbel | Belgian Dubbel | Belgian Dubbel    | 5   | 5   | 5   | 4/12/2023   |
        | 20 | Blonde Ale     | Blonde Ale     | Blonde Ale        | 5   | 5   | 5   | 4/12/2023   |

        on_tap: ( values null until seeded with form input)
        | id | tap_name | beer_id | date_added              | date_removed | added_by | removed_by |
        |----|----------|---------|-------------------------|--------------|----------|------------|
        | 1  | 1        | NULL    | NULL                    | NULL         | NULL     | NULL       |
        | 2  | 2        | 3       | 2023-04-16 15:12:25.028 | NULL         | 1        | NULL       |
        | 3  | 3        | NULL    | NULL                    | NULL         | NULL     | NULL       |
        | 4  | 4        | 2       | 2023-04-16 15:12:21.142 | NULL         | 1        | NULL       |
        | 5  | 5        | NULL    | NULL                    | NULL         | 1        | NULL       |
        | 6  | 6        | NULL    | NULL                    | NULL         | NULL     | NULL       |
        | 7  | 7        | NULL    | NULL                    | NULL         | NULL     | NULL       |
        | 8  | 8        | NULL    | NULL                    | NULL         | NULL     | NULL       |
        | 9  | 9        | NULL    | NULL                    | NULL         | NULL     | NULL       |
        | 10 | 10       | NULL    | NULL                    | NULL         | NULL     | NULL       |



        next_on_tap: ( values null until seeded with form input)

        | id | tap_name | beer_id | date_added              | date_removed | added_by | removed_by |
        |----|----------|---------|-------------------------|--------------|----------|------------|
        | 1  | 1        | NULL    | NULL                    | NULL         | NULL     | NULL       |
        | 2  | 2        | NULL    | NULL                    | NULL         | NULL     | NULL       |
        | 3  | 3        | NULL    | NULL                    | NULL         | NULL     | NULL       |
        | 4  | 4        | NULL    | NULL                    | NULL         | NULL     | NULL       |
        | 5  | 5        | 4       | 2023-04-16 15:12:12.163 | NULL         | 1        | NULL       |
        | 6  | 6        | NULL    | NULL                    | NULL         | NULL     | NULL       |
        | 7  | 7        | NULL    | NULL                    | NULL         | NULL     | NULL       |
        | 8  | 8        | NULL    | NULL                    | NULL         | NULL     | NULL       |
        | 9  | 9        | NULL    | NULL                    | NULL         | NULL     | NULL       |
        | 10 | 10       | NULL    | NULL                    | NULL         | NULL     | NULL       |
