# password
This application is a very simplified example of connexion with authenticated user. Client and server connections are performed in HTTP. Don't use it in a real world context.

# Try the application
In order to try this application, you need *SQLite* to be installed and running on your computer.

1. Clone this project.
1. Create the database:
    - In directory *password/server/db* type the following command :
        ```
        sqlite3 -init data.sql data .exit
        ```
    this will create the database *data* containing two tables : *user* and *city*. 
    - *user* only contains one line : *toto* whose password is *123*
    - *city* is given is given as an example, in order to gelp you to understand the app.
1. Verify the database:
    - Enter `sqlite data`. The *sqlite* prompt should appear.
    - type `.tables` to verify that the tables *user* and *city* have been created.
    - type `select * from city` and `select * from user`.
1. Enter `npm install` both on *server* and *client* sides. 
1. Enter `npm start` on *server* side. By default, the server is running on port *8000*.
1. Enter `npm start` on *client* side. By default, client is running on port *3000*.

# A look at the App
1. The navbar gives 3 links :
    - *Home* renders a *public* page
    - *Login* renders a connection form
    - An integrated connection form
Of course, in your app, you will have to choose between a link to a connection form or an integrated form in the navbar.
1. Connect the user *toto* (password *123*).
    - The connection form is replaced by a button
    - A new link (*cities*) appears rendering the list of cities

# Adapting your own application by using this application


