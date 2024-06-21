const express = require("express");
const dotenv = require('dotenv');
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

dotenv.config();

const mongodb = require("./data/connect");
const app = express();

const port = process.env.PORT || 8080;

app.use(express.json());  // Ensure body parsing middleware is used
app.use("/", require("./routes"));

const swaggerOptions = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'Contact Management API',
      version: '1.0.0',
      description: 'API for managing contacts',
    },
    servers: [
      {
        url: `http://localhost:${port}`,
      },
    ],
  },
  apis: ['./routes/*.js'],
};

const swaggerDocs = swaggerJsdoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

mongodb.initDb((err) => {
  if (err) {
    console.log(err);
  } else {
    app.listen(port, () => {
      console.log(`Database is connected and server running on port ${port}`);
    });
  }
});