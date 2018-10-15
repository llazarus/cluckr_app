const express = require('express');
const morgan = require('morgan');
const path = require('path');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const moment = require('moment');

const app = express();

app.set("view engine", "ejs");

// MIDDLEWARE
app.use(morgan('dev'));

app.use(bodyParser.urlencoded({ extended: true }));

app.use(cookieParser());

app.use(express.static(path.join(__dirname, "public")));
console.log("__dirname in ./index.js:", __dirname);

// CUSTOM -- USERNAME MIDDLEWARE
app.use((req, res, next) => {
  const username = req.cookies.username;
  res.locals.username = "";

  if (username) {
    res.locals.username = username;
  }
  next();
});

app.locals.moment = require('moment');

// ROUTERS
const clucksRouter = require("./routes/clucks");
app.use("/", clucksRouter);

// SERVER
const DOMAIN = 'localhost';
const PORT = '5000';
app.listen(PORT, DOMAIN, () => {
  console.log(`Server is up and running on http://${DOMAIN}:${PORT}`);
});