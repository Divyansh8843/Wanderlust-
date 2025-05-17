const User = require("../models/users");
const ExpressError = require("../utils/ExpressError");
// control for add/signup user
module.exports.signupuser = async (req, res, next) => {
  try {
    console.log("user registration");
    let newuser = new User({
      email: req.body.user.email,
      username: req.body.user.username,
    });
    const registered_user = await User.register(
      newuser,
      `${req.body.user.password}`
    );
    // console.log(registered_user);
    // for automatic login after sign up
    req.login(newuser, (err) => {
      if (err) {
        console.log("error occuered", err);
        return next(err);
      }
      req.flash("success", "User registered  successfully!");
      res.redirect("/lists");
    });
  } catch (err) {
    if (!req.body.user) {
      req.flash("error", "User not registered!");
      // next(new ExpressError(400, "User not found"));
      res.redirect("/lists");
    }
  }
};

// control for sign in user
module.exports.signinuser = async (req, res) => {
  let redirectUrl = res.locals.redirectUrl;
  if (redirectUrl) {
    req.flash("success", "Logged in Successfully");
    res.redirect(res.locals.redirectUrl);
  } else {
    req.flash("success", "Welcome back to wanderlust!");
    res.redirect("/lists");
  }
};

module.exports.signoutuser = async (req, res) => {
  req.logout((err) => {
    if (err) {
      req.flash("error", "you can not logout now");
      res.redirect("/lists");
    }
    req.flash("success", "Logged out Successfully!");
    res.redirect("/lists");
  });
};
