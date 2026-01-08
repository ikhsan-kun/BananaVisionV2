require("dotenv").config();

const app = require("./app.js");

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`Radar Tegal API Server running on http://localhost:${PORT}`);
});