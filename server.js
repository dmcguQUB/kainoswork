/*index.js file
This file is used to set up Node.js server using an Express framework
Routes and behaviours of the website are also defined with different pages of the web application
*/

//Importing of necessary packages for web page
const express = require("express"); // Import the express framework and eventually create instance of class
const cookieParser = require("cookie-parser"); //Import the cookie-parser middleware to parse and handle cookies to be used to enable sessions for the user
const sessions = require("express-session"); // Import express middleware to allow to store user sessions to maintain state across different web pages
const path = require("path"); // Import the path module to allow to access files and directory paths
const connection = require("./connection.js"); // import database connection module to set up connection to database

// create an instance of the express
let app = express();

// Create the constants to be used throughout the index.js file
const port = process.env.PORT || 3000; // define the port as a constant, specifically port 3000
const halfDay = 1000 * 60 * 60 * 12; // the constant for a session to last half a day

//import bycrypt library to hash user password stored in database for increased security
//const bcrypt = require("bcrypt");
const saltRounds = 10; // Can increase the value for greater hashing and security but will slow down performance

//Create a path to serve the static web pages from the public folder
app.use(express.static(path.join(__dirname, "./public"))); // I use the express middleware here to serve the static files

//Set up middleware used to parse form data using express.urlencoded
app.use(express.urlencoded({ extended: false }));

//Ensure that the view engine for the EJS files are set up. This allows for the EJS files to have embedded JS to allow us to make dynamic HTML pages
app.set("view engine", "ejs");

// Set up an instance of the cookie parcer middleware and allow it to parse cookies to the HTTP header. This is important for identifying if a user is authenticated and maintaining sessions as they move through the web pages
app.use(cookieParser());

//Set up the session middleware using sessions()
app.use(
  sessions({
    secret: "thisismysecrctekey599", // secret key used for the session with expiration half a day
    saveUninitialized: true, // save new sessions even if the user has not modified anythinb in their request
    cookie: { maxAge: halfDay }, // ensure cookies expire after half a day
    resave: false, // only save session if there has been modifications during the request to reduce number of uncessary writes to the session store and help reduce the load on the server
  })
);

// Define a route handler for GET requests to the home page
app.get('/', (req, res) => {
    res.render('createemployee');
});

// Define a route handler for GET requests to the /viewemployee page
app.get('/viewemployee', (req, res) => {
    // Query the database
    connection.query('SELECT * FROM user', (error, results, fields) => {
        console.log(results);
        if (error) throw error;
        
        // Render the EJS template with the data from the database
        res.render('viewemployee', { employees: results });
    });
});


// Start the server
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});



