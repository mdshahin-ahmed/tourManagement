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
app.use("/api/v1/tours", tourRoute);

module.exports = app;

// 1. app.js done
// 2. server.js done
// 3. tour.js/schema done
