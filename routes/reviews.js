
const express = require("express")
const router = express.Router({ mergeParams: true });
const WrapAsync = require("../utils/wrapasync.js");
const { isLoggedIn, isAuthor } = require("../middleware.js");
const ReviewController = require("../controllers/reviewcontrol.js")
// route for add review
router.route("/add").post(isLoggedIn,
    WrapAsync(ReviewController.addreview)
);

// route for delete review
router.get(
  "/:reviewid/delete",isLoggedIn,isAuthor,
 WrapAsync(ReviewController.deletereview)
);

module.exports = router;

