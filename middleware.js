const List = require("./models/Listing");
const Review = require("./models/reviews");

// logged in middleware
module.exports.isLoggedIn = (req, res, next) => {
  if (!req.isAuthenticated()) {
    req.session.redirectUrl = req.originalUrl;
    req.flash("error", "You must be signed in first!");
    return res.redirect("/list/finduser");
  }
  next();
};

// redirect after log in middleware
module.exports.saveRediretUrl = (req, res, next) => {
  if (req.session.redirectUrl) {
    res.locals.redirectUrl = req.session.redirectUrl;
  }
  next();
};

// if List owner then have permission for edit and delete
module.exports.isOwner = async (req, res, next) => {
  let { id } = req.params;
  let list = await List.findById(`${id}`);
  if (!res.locals.currUser._id.equals(list.owner._id)) {
    req.flash("error", "You have not permission to change it");
    return res.redirect("/lists");
  }
  next();
};

// if reveiw author then have permission for edit and delete
module.exports.isAuthor = async (req, res, next) => {
  let { id, reviewid } = req.params;
  let review = await Review.findById(`${reviewid}`);
  if (!res.locals.currUser._id.equals(review.reviewer._id)) {
    req.flash("error", "You are not the author of the review");
    return res.redirect(`/lists/${id}`);
  }
  next();
};
