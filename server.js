const mongoose = require("mongoose");
const dotenv = require("dotenv").config();
const colors = require("colors");

const app = require("./app");

// database connection
// mongoose.connect(process.env.DATABASE_LOCAL).then(() => {
//   console.log(`database connection is successful!`.green.bold);
// });
mongoose.connect(process.env.DATABASE).then(() => {
  console.log(`database connection is successful!`.green.bold);
});

// server
const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`App is running on port ${port}`.yellow.bold);
});
