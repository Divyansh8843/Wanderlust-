const Review = require("../models/reviews")
const List=require("../models/Listing.js")
const ExpressError = require("../utils/ExpressError.js");

//control for delete review
module.exports.deletereview = async (req, res, next) => {
  let { id, reviewid } = req.params;
  let review = await Review.findByIdAndDelete(`${reviewid}`);
  if (!review) {
    next(new ExpressError(400, "Review not found!"));
  }
  req.flash("success", "Review Deleted!");
  res.redirect(`/lists/${id}`);
};

// control for add review form
module.exports.addreviewform = (req, res, next) => {
  let { id } = req.params;
  // console.log(id);
  res.render("./Reviewviews/review.ejs", { id });
};

// control for add review
module.exports.addreview = async (req, res, next) => {
    let { id } = req.params;
  let { new_rating, new_comment } = req.body;
  let newreview = new Review({
    comment: new_comment,
    rating: new_rating,
  });
    let list = await List.findById(`${id}`);
  if (!list) {
    next(new ExpressError(400, "List not found!"));
  }
  newreview.reviewer = req.user._id;
  list.reviews.push(newreview);
  await newreview.save();
  await list.save();
  req.flash("success", "New Review Created!");
  res.redirect(`/lists/${id}`);
};