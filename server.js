const express = require("express");
const dotenv = require('dotenv');
dotenv.config();

const mongodb = require("./data/database");
const app = express();

const port = process.env.PORT || 8080;

app.use(express.json());  // Ensure body parsing middleware is used
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