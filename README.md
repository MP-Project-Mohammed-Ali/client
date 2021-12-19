# client

## Description :

Website about legal advice with many lawyer that have more experience and the user you can ask the lawyer about any question about law.

## User Stories:

- **Signup:** I can sign up to website to complete register information.
- **Login:** I can login to website so that I can select what I want from this website.
- **Add Case** As a user I can add case and select lawyer.
- **ُEdit case** As a user I can edit any case from my profile.
- **Ask lawyer** As a user I can ask about any case.
- **show case** As a user I can the most important case without ask lawyer.

### Admin Stories:

- **Add User** As a Admin I can add new user and give permation.
- **Add lawyer** As a Admin I can add new lawyer give permation.
- **show all case** As a Admin I can show all case.

### Lawyer Stories:

- **Signup:** I can sign up to website to complete register information.
- **Login:** I can login to website so that I can select what I want from this website.
- **show case** As a lawyer I can show all information that user ask about us.

## Router:

| path        | Component     | Permissions | Behavior         |
| ----------- | ------------- | ----------- |------------------|
| /signup     | Register Page | Public      | Sign form ,link to login,navigate to homepage after signup |
| /           | Home Page     | Public      | Home page                                                  |
| /login      | Login Page    | public      | Login form ,link to signup,navigate to homepage after login|
| /addcase    | Case Page     | User&Lawyer | Create a case                                              |
| /addchat    | Chat Page     | User&Lawyer | Conect user with lawyer togather                           |
| /showlawyer | Lawyer Page   | User&Lawyer | Shows all lawyers to select one of them to take the case   |          
| lawyer/show | Name Lawyer   | Admin only  | Shows all lawyers                                          | 
| user/show   | Name User     | Admin only  | Shows all users                                            | 

## Components:
* Register Page 
* Login Page 
* Home Page
* Lawyer Page
* Case Page
* Chat Page
* Navbar


## Diagram:

![UML Diagrm](https://github.com/MP-Project-Mohammed-Ali/client/blob/main/diagram/UML%20Diagram%20V1.png)

![WireFrame](https://github.com/MP-Project-Mohammed-Ali/client/blob/main/diagram/WireframeV1.png)

#### Trello:
[Trello website](https://trello.com/b/wgen9s3X/mp-project-mohammed-ali)

#### Server repositories
[Server repositories](https://github.com/MP-Project-Mohammed-Ali/server)

### Deployed App Link  
[Deployed App Link](https://github.com/M0hammed-18)

#### Slides
[Slide Link](https://github.com/M0hammed-18)
