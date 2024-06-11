const express = require('express');
const app = express();

app.get('/', (req, res) => {
    res.send('Hello World');
});

const port = 8080;

app.listen(process.env.PORT || port, () => {
    console.log(`web server listening at port ` + (process.env.PORT || port));
});