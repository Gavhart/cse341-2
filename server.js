const express = require("express");
const dotenv = require('dotenv');
dotenv.config();

const mongodb = require("./data/database"); // Correct path to your database.js file
const app = express();

const port = process.env.PORT || 8080;

app.use(express.json());  // Middleware to parse JSON bodies

// Root route
app.get('/', (req, res) => {
    res.send('Welcome to the Contact Management API');
});

// Include your routes
app.use("/", require("./routes"));

mongodb.initDb((err) => {
  if (err) {
    console.log(err);
  } else {
    app.listen(port, () => {
      console.log(`Database is connected and server running on port ${port}`);
    });
  }
});