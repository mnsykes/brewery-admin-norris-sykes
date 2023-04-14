# brewery-admin-norris-sykes

## created by matthew sykes and daniella norris 

### this beer application is intended for brewery use, with different login permissions for management, brewers, and staff. 

### there are 3 main data sources used for this application:

- AI image generation using Open Source API
  -  The AI is pulled from Open AI, a downloaded module within node_modules. Random images are prompted to generate upon form submission on the stylesearch page, with "in a glass with an art deco background" concetaded to the name of the beer that was selected. Due to the longer loading time for the AI generation,  a loading bar is placed on the page as the image generates. 
- A beer style guideline JSON API from Github
  - This JSON is technically for educational use only, with the information provided by BCJB and the JSON file derived from:
   const apiurl = `https://raw.githubusercontent.com/ascholer/bjcp-styleview/main/styles.json`;
- A SQL database containing requests, roles, and employees
  - located in schema/schema.sql route. 
  -  the database used is toot_app_db. visually, the sql tables appear as so: 
   
        | id | first_name | last_name | role_id | username  | password                                                     |
        |----|------------|-----------|---------|-----------|--------------------------------------------------------------|
        | 1  | Matt       | Manager   | 1       | m.manager | protected |
        | 2  | Daniella   | Manager   | 1       | d.manager | protected |

        | id | role       |
        |----|------------|
        | 1  | Management |
        | 2  | Brewhouse  |
        | 3  | Tap Room   |

        | id | requestor_id | style | notes     | request_date | approver_id | approval_date |
        |----|--------------|-------|-----------|--------------|-------------|---------------|
        | 2  | 1            | lager | need asap | 4/2          | 2           | 4/3           |

