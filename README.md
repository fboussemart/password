# password
This application is a very simplified example of connexion with authenticated user. Passwords and user names are sent and recorded in plain text. This is just an exercise. Don't use it in a real world context.

# Try the application
1. Clone this project
1. Enter `npm install` both in *server* and *client* directories
1. Enter `npm run reinitDB` in *server* directory, and then `npm run server`
1. Enter `npm start` in *client* directory
1. The *protected* route only appears when a user is logged in. The only user recorded in *users* collection is *toto* with password *123*.

# Using this code in your application

## Adapting server side
1. Create a *user* collection in your database
1. Copy the `protect` function into your *router.js* file
1. Chain the `post('/login',...)` and `post('/signUp',...)` routes to your router.
1. To protect a route, use the *protect* function as follows:
    - consider the following unprotected route:
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
1. In your *NavBar* class:
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
