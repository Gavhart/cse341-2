const swaggerAutogen = require('swagger-autogen')();

const doc = {
    info: {
        title: "API Documentation",
        description: "This is a simple API documentation made with Swagger",
    },
    host: "localhost:8080",
    schemes: ['http', 'https'],
};

const outputFile = './swagger.json';
const endpointsFiles = ['./routes/index.js'];

swaggerAutogen(outputFile, endpointsFiles, doc);