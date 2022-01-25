const express = require('express');
const app = express();
const port = 3000 || process.env.PORT;
const bodyParser = require('body-parser');

app.use(bodyParser.json());

require("./routes")(app);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
