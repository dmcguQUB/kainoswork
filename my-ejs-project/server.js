const express = require('express');
const app = express();
const port = 3000;

// Set EJS as templating engine
app.set('view engine', 'ejs');

// Serve static files from "public" directory
app.use(express.static('public'));

// Define a route handler for GET requests to the home page
app.get('/', (req, res) => {
    res.render('createemployee');
});

// Define a route handler for GET requests to the home page
app.get('/viewemployee', (req, res) => {
    res.render('viewemployee');
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
