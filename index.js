const express = require('express');
const app = express();
const port = 3000 || process.env.PORT;
const bodyParser = require('body-parser');
const swaggerUi = require('swagger-ui-express'),
swaggerDocument = require('./swagger.json');

app.use('/api-docs', swaggerUi.serve,  swaggerUi.setup(swaggerDocument));
app.use(bodyParser.json());

require("./routes")(app);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
