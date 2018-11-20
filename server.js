"use strict";

require("dotenv").config();

const PORT = process.env.PORT || 4000;

const ENV = process.env.ENV || "development";
const cors = require("cors");
const bodyParser = require("body-parser");
const express = require("express");
const app = express();

// Configuration of Knex
const knexConfig = require("./knexfile");
const knex = require("knex")(knexConfig[ENV]);
const knexLogger = require("knex-logger");

// Log knex SQL queries to STDOUT as well
app.use(knexLogger(knex));

// Add Proper CORS headers to all routes
app.use(cors());

// Parses JSON Bodies in POST requests

app.use(bodyParser.json());

// Routes
const usersRoutes = require("./routes/users");

// Mount all resource routes
app.use("/api/users", usersRoutes(knex));

app.listen(PORT, () => console.log(`Example app listening on port ${PORT}!`));
