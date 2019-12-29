# password
This application is a very simplified example of connexion with authenticated user.
To be more realistic, connections between client and server apps should be performed in [HTTPS](https://nodejs.org/api/https.html).
Don't use it in a real world context.

# The application
The code provided in this project gives you the keys to create an application dealing with authentication.
In the same time, an example application is proposed so that you can clearly figure out the different mechanisms.

1. In order to try this application, you need [SQLite](https://www.sqlite.org/index.html) to be installed and running on your computer.
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

1. The `<App/>` (*password/client/src/App.js*) component defines the routes:
    ```
    import Login, {ProtectedRoute} from "./Login";
    ...
    <Switch>
        <Route exact={true} path="/" component={Home}/>
        <Route exact={true} path="/home" component={Home}/>
        <ProtectedRoute exact={true} path="/cities" component={Cities} />
        <Route exact={true} path="/login" component={Login}/>
        <Route path="*" component={() => <p>Page Not Found</p>}/>
    </Switch>
    ```
    - The two first routes are classical ones. See [react-router-dom](https://reacttraining.com/react-router/web/guides/quick-start) for more explanations.
    - `<ProtectedRoute/>` is defined in file *password/client/src/Login.js*. A protected route is effective only if a user is connected.
    - The fourth route points to component `<Login/>` defined in file *password/client/src/Login.js*. It allows rendering an authentication form.

1. The `<NavBar/>` (*password/client/src/NavBar.js*) provides different links :
    ```
    import Login, {ProtectedLink} from './Login';
    ...
    <nav className="navbar navbar-light bg-light">
        <Link className="nav-link" to={"/home"}>Home </Link>
        <Link className="nav-link" to={"/login"}>Login </Link>
        <ProtectedLink className="nav-link" to={"/cities"}>cities </ProtectedLink>
        <Login/>
    </nav>
    ```
    - The first link is classical one.
    - The second link points to the connection form defined in `<Login/>` component.
    - The third link is a `<ProtectedLink/>` also coming from *Login.js*. A protected link only appears when a user is logged in.
    - The last line renders the connection form right away in the NavBar. In your own app, your can decide between a link and a Form in the NavBar.
    In your own app, your can decide between a link and a Form in the NavBar.
1. The `<Cities/>` (*password/client/src/Cities.js*) component is a protected component : it is efficient only if a a user is connected to the server : 
    ```
    import axios from "axios";
    import {HTTP_SERVER_PORT} from "./constants";
    ...
    export default function Cities(props) {
        axios.defaults.headers.common['Authorization'] = 'Bearer ' + props.token;

        const [cities, setCities] = useState([]);

        async function getCities() {
            const data = (await axios.get(HTTP_SERVER_PORT + 'cities')).data;
            setCities(data);
        }

        useEffect(() => {
            getCities()
        }, []);
        ...
    ```
    - `axios.default...` defines the header when connecting to the server. It allows the client to be authenticated by the server.
    See [axios package](https://www.npmjs.com/package/axios).
    - Asynchronious function `getCities` sends a *GET* request to the server

# Trying the app
Connect the user *toto* (password *123*):
- The connection form is replaced by a button
- A new link (*cities*) appears rendering the list of cities

# Adapting your own server
If you want to adapt your own App in order to deal with user accounts, you have to adapt your server as follows:
1. Verify that your *SQLite* database contains a *user* table. If not, you can adapt your database, or modify the queries in the  file *connectionRouter.js*.
1. Verify your file *package.json* and install the missing packages if necessary.
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
    const db = new sqlite3.Database('db/data'); // connection to the SQLite database 'data'
    const verify=require('./connectionRouter').verify; // middleware function to protect routes
    ```
1. Whenever you want to protect an endpoint, use the function *verify* as follows in your *router.js* file:
    ```
    const verify=require('./connectionRouter').verify;
    ...
    router
    .get("/your_endpoint", verify, (req, res) => {...} 
    ```
    Now, the endpoint `your_endpoint` is only accessible by authenticated users.

# Adapting your client app
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
In this way, the component `<Your_component/>` is only accessible by a connected user.

## Protected links
As shown in *password/client/src/NavBar.js*, you can use *protected links* as follows:
```
import {ProtectedLink} from './Login';
...
<ProtectedLink to={"/your_endpoint"}> ... </ProtectedLink>
```
In this way, the link to the endpoint `/your_endpoint` is only effective when a user is logged in.

## Login form
The `<Login/>` component provides a connection form.
Use it as follows:
```
import Login from './Login';
...
<Login/>
```
Remark : In case a user is connected, the `<Login/>` component renders a *disconnect* button.
## Checking the connection
In every component, you can check if a user is connected or not as follows:
```
import {useCookies} from 'react-cookie';
...
export default function Your_component() {
    const [cookies] = useCookies(['login']);
    const isConnected = cookies.login&&cookies.login.username;
    ...
}
```
Have a look at `<Home/>` component for a complete example.
    





