const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");

app.use(express.json());
app.use(cors());

// routes
const tourRoute = require("./routs/tour.route");

app.get("/", (req, res) => {
  res.send("Route is working! YaY!");
});

// posting to detabase
app.use("/api/v1", tourRoute);

module.exports = app;

// 1. app.js done
// 2. server.js done
// 3. tour.js/schema done

// problem number 1 Done
// problem number 2 Done
// problem number 3 Working
// problem number 4 Done
// problem number 5
// problem number 6 Done
