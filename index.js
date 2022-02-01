const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const swaggerUi = require('swagger-ui-express'),
swaggerDocument = require('./swagger.json');

app.use('/api-docs', swaggerUi.serve,  swaggerUi.setup(swaggerDocument));
app.use(bodyParser.json());

require("./routes")(app);

module.exports = { app };