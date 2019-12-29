# password
This application is a very simplified example of connexion with authenticated user. Client and server connections are performed in HTTP. Don't use it in a real world context.

# The application
The code provided in this project gives you the keys to create an application dealing with authentication.
In the same time, an example application is proposed so that you can clearly understant what is going on.

1. In order to try this application, you need *SQLite* to be installed and running on your computer.
1. Clone this project.
1. Create the database:
    - In directory *password/server/db* type the following command :
        ```
        sqlite3 -init data.sql data .exit
        ```
    this creates the database *data* containing two tables : *user* and *city*. 
    - *user* only contains one line : *toto* whose password is *123*
    - *city* is given is given as an example, in order to gelp you to understand the app.
1. Verify the database:
    - Enter `sqlite data`. The *sqlite* prompt should appear.
    - type `.tables` to verify that the tables *user* and *city* have been created.
    - type `select * from city` and `select * from user`.
1. Enter `npm install` both on *server* and *client* sides. 
1. Enter `npm start` on *server* side. By default, the server is running on port *8000*.
1. Enter `npm start` on *client* side. By default, client is running on port *3000*.

# Explanations

1. The `<App/>` component defines the routes:
```
    <Switch>
        <Route exact={true} path="/" component={Home}/>
        <Route exact={true} path="/home" component={Home}/>
        <ProtectedRoute exact={true} path="/cities" component={Cities} />
        <Route exact={true} path="/login" component={Login}/>
        <Route path="*" component={() => <p>Page Not Found</p>}/>
    </Switch>
```

- The two first routes are classical ones. See [react-router-dom](https://reacttraining.com/react-router/web/guides/quick-start) for more explanations.

1. The navbar gives different links :
    ```
    <nav className="navbar navbar-light bg-light">
        <Link className="nav-link" to={"/home"}>Home </Link>
        <Link className="nav-link" to={"/login"}>Login </Link>
        <ProtectedLink className="nav-link" to={"/cities"}>cities </ProtectedLink>
        <Login/>
    </nav>
    ```
    - *Home* renders a *public* page. A classical `<Link/>` from *react-router-dom* is used.
    - The second link renders the `<Login/>` component defined in *Login.js*. The login form (ot the disconnect button) is rendered.
    - The third link is a `<ProtectedLink/>` also coming from *Login.js*. This link only appears when a user is logged in.
    - The last line *Login* renders a connection form
    
The *Login* a link to a connection form and an integrated form in the navbar.
1. Connect the user *toto* (password *123*).
    - The connection form is replaced by a button
    - A new link (*cities*) appears rendering the list of cities

# Adapting your own server
If you want to adapt your own App in order to deal with user accounts, you have to adapt your server as follows:
1. Verify that your *SQLite* database contains a *user* table. If not, you can both adapt your database, or modify the queries in the  file *connectionRouter.js*.
1. Verify your file *package.json* and install the missing packages.
1. Copy the file *connectionRouter.js* into your own server app.
1. In your *server.js* file, add the following lines:
    ```
    const connectionRouter = require('./connectionRouter').router;
    ...
    app.use(connectionRouter); // before your app.use(router) line
    ```
1. In your *router.js* file, add the following lines:
    ```
    const sqlite3 = require('sqlite3').verbose();
    const db = new sqlite3.Database('db/data'); // connection to the SQLite database
    const verify=require('./connectionRouter').verify; // middleware function to protect routes
    ```
1. Each time you want to protect an endpoint, use the function *verify* as follows:
    ```
    router
    .get("/your_endpoint", verify, (req, res) => {...} 
    ```
    Now, the endpoint `your_endpoint` is only accessible by connected users.

# Adapting your client
1. Verify your file *package.json* and install the missing packages.
1. Copy the file *Login.js* into your own client app.

## Protected routes
If you are using `react-router-dom`, you can protect routes by using `<ProtectedRoutes/>` as follows:
```
import {ProtectedRoute} from "./Login";
...
<Switch>
...
    <ProtectedRoute exact={true} path="/your_path" component={Your_component} />
...
</Switch>
```
Then, the component `<Your_component/>` is only accessible by a connected user.

## Protected links

