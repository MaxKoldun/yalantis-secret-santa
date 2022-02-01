const { app } = require("./index.js");
const port = 3000 || process.env.PORT;

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});