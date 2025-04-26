// NPM Common use packages
const express = require("express");
const app = express();
const port = 8080;
const path = require("path");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const flash = require("connect-flash");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const User = require("./models/users.js");
if (process.env.NODE_ENV != "production") {
  // not upload in git hub
  require("dotenv").config();
}

// MONGOOSE DB connection
const dbURL = process.env.ATLASDB_URL;
const mongoose = require("mongoose");
main().catch((err) => console.log(err));
async function main() {
  await mongoose.connect(dbURL);
}

// For parsing JSON data
app.use(express.json());
// For parsing URL-encoded data
app.use(express.urlencoded({ extended: true }));
// for ejs
const ejsMate = require("ejs-mate");
const listingRouter = require("./routes/listings.js");
const reviewRouter = require("./routes/reviews.js");
const userRouter = require("./routes/user.js");

// Set EJS Mate as the templating engine
app.engine("ejs", ejsMate);
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));

// use mongo session for production purpose(valid upto default 14 days)
const store = MongoStore.create({
  mongoUrl: dbURL,
  crypto: {
    secret: process.env.SECRET,
  },
  touchAfter: 24 * 3600,
});
store.on("error", () => {
  console.log("Error in mongo session store", err);
});

// session options
const sessionoptions = {
  store,
  secret: process.env.SECRET,
  resave: false,
  saveUninitialized: true,
  cookie: {
    expires: Date.now() + 7 * 24 * 60 * 60 * 1000,
    maxAge: 7 * 24 * 60 * 60 * 1000,
    httpOnly: true,
  },
};

// use local session storage (cookies,secrets,session related info)
app.use(session(sessionoptions));
// flash middleware use
app.use(flash());

// use local strategy and use with sessions (authentication part)
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// flash messages
app.use((req, res, next) => {
  res.locals.success = req.flash("success");
  res.locals.error = req.flash("error");
  res.locals.currUser = req.user;
  next();
});

app.use("/lists", listingRouter);
app.use("/lists/:id/reviews", reviewRouter);
app.use("/list", userRouter);
app.get("/",(req,res)=>
{
  res.send("main route")
})
// Error handling middleware
// page not found
app.all("*", (req, res, next) => {
  req.flash("error", "Page Not Found");
  res.redirect("/lists");
});

app.use((err, req, res, next) => {
  // console.log("error with name");
  // console.log(err.name);
  if (err.name === "ValidationError") {
    console.log("Validation error occured");
  }
  next(err);
});

app.use((err, req, res, next) => {
  let { status = 500, message = "Error occured" } = err;
  // console.log("------Error------")
  res.render("./includes/Error.ejs", { status, message });
});

app.listen(port, () => {
  console.log(`app is listening on port: ${port}`);
});
