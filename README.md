# password
This application is a very simplified example of connexion with authenticated user. Passwords and user names are sent and recorded in plain text. This is just an exercise. Don't use it in a real world context.

# Try the application
1. Clone this project
1. Enter `npm install` both on *server* and *client* sides. Two examples are proposed: *client1* and *client2*
1. Enter `npm run reinitDB` on *server* side, and then `npm run server`
1. Enter `npm start` on *client* side
1. The *protected* route only appears when a user is logged in. The only user recorded in *users* collection is *toto* with password *123*.

# Using this code in your application

## Adapting server side
1. Create a *users* collection in your database
    - In the *mongoose.js* file, you can define the schema as follows:
    ```
    const usersSchema = Schema(
      {
        username: String,
        password: String
      },
      { versionKey: false }
    );
    ```
    - In a *MongoDB* environment, you can create the first user as follows:
    ```
    db.users.drop();
    db.users.insert({
        username: 'toto',
        password: '123'
    });
    ```
    Of course, other fields (email, phone, ...) can be added to the collection *users*
1. Add the following *post('/login',...)* and *post('/signUp',...)* routes to your router.
    ```
    .post("/login", (req, res) => {
        if (!req.body.username || !req.body.password) {
            res.json({isConnected: false})
        } else {
            Users.findOne({username: req.body.username, password: req.body.password})
                .exec((err, data) => {
                    if (err) console.log("error", err);
                    else {
                        if (data) res.json({isConnected: true});
                        else res.json({isConnected: false})
                    }
                })
        }
    })
    .post("/signUp", (req, res) => {
        if (!req.body.username || !req.body.password) {
            res.json({isConnected: false})
        } else {
            Users.findOne({username: req.body.username})
                .exec((err, data) => {
                    if (err) console.log("error", err);
                    else {
                        if (data) res.json({isConnected: false});
                        else {
                            const q = new Users({username:req.body.username,password:req.body.password});
                            q.save()
                                .then(() => res.json({isConnected: true}))
                                .catch(err => res.status(400).send("unable to save to database:", err))
                        }
                    }
                })
        }
    })
    ```

## Optional: protecting routes on server side
1. copy the *protect* function into your *router.js* file
    ```
    const protect = (req, res, f) => {
    if (!req.headers || !req.headers.username || !req.headers.password) {
        res.json({isConnected: false});
        return;
    }
    Users.findOne({username: req.headers.username, password: req.headers.password})
        .exec((err, data) => {
            if (err) console.log("error", err);
            else {
                if (data) f(req, res);
                else res.json({isConnected: false})
            }
        })
    };
    ```
1. to protect a route, wrap the anonymous function as described on the following example:
    - consider an unprotected route:
    ```
    .get("/cities", (req, res) => {
        Cities
            .find({})
            .exec((err, data) => {
                if (err) console.log("error", err);
                else res.json(data);
            });
    })
    ```
    - wrap it with the *protect* function as follows:
    ```
    .get("/cities", (req, res) => {
        protect(req, res, () => {
            Cities
                .find({})
                .exec((err, data) => {
                    if (err) console.log("error", err);
                    else res.json(data);
                });
        })
    })
    ```
    That's it!!
    
## Adapting client side
1. Copy the file *Login.js* into your *client/src* directory
1. **Option 1:** using *Login.js* in a *NavBar* class (see *client1* example)
    - add the following state into the constructor:
    ```
    this.state = {connected: false};
    ```
    - Copy the *checkConnexion* method:
    ```
    checkConnexion(connected) {
        if (connected !== this.state.connected) this.setState({connected: connected})
    }
    ```
    - Check the `Login.getUser()` method before rendering the protected routes
    - Render the component `<Login checkConnexion={(b) => this.checkConnexion(b)}/>`
1. **Option 2:** using *Login.js* in a *Route* component (see *client2* example)
    - adapt your *App* class, as presented in this example:
    ```
    class App extends Component {
        constructor(props) {
            super(props);
            this.state = {connected: false};
        }

        checkConnexion(connected) {
            if (connected !== this.state.connected) this.setState({connected: connected})
        }

        render() {
            return (
            <>
                <NavBar connected={this.state.connected}/>
                <Switch>
                    ...
                    <Route exact={true} path="/login"
                           render={props => <Login {...props} checkConnexion={b => this.checkConnexion(b)}/>}/>
                    ...
                </Switch>
            </>);
        }
    }

    ```
    - add a new state to the *NavBar* class:
        ```
        constructor(props) {
           super(props);
           this.state = {connected: false};
        }
        ```
    - protect the *protected* links:
    ```
    const protectedLinks = this.props.connected ?
            <li><Link className="nav-link" to={"/protected"}>Protected </Link></li> : null;
    ```
## Optional: using protected routes on client side
1. When you need to access a protected route, add the users informations into the *headers* of your HTTP request by using the `Login.getUser()` method.
For example, to get the cities list:
    ```
    const cities = (await axios.get(HTTP_SERVER_PORT + 'cities', {headers: Login.getUser()})).data;
    ```
1. In each protected component add the following test before rendering:
    ```
    render() {
    if (!Login.getUser()) {
            return (<p>Access forbidden</p>);
        }
    ...
    ```
