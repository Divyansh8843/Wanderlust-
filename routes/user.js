const express = require("express")
const router = express.Router({ mergeParams: true });
const WrapAsync = require("../utils/wrapasync.js");
const passport=require("passport");
const {isLoggedIn} = require("../middleware.js")
const {saveRediretUrl} = require("../middleware.js")
const ListsController = require("../controllers/listingcontrol.js");
const UserController = require("../controllers/usercontrol.js");
const multer = require("multer")
const { storage } = require("../CloudConfig.js");
const upload = multer({ storage })

// for add new list 
router.route("/add").get(isLoggedIn, WrapAsync(ListsController.addform)).post(isLoggedIn,upload.single('listing[image]'),WrapAsync(ListsController.addlist));

// for add new user 

router.route("/adduser").get((req, res) => {
  res.render("./userviews/newuser.ejs");
}).post(WrapAsync(UserController.signupuser));

// for find user

router.route("/finduser").get((req, res) => {
  res.render("./Userviews/olduser.ejs");
}).post(
  saveRediretUrl,passport.authenticate("local", {
    failureRedirect: "/list/finduser",
    failureFlash: true,
  }),
  WrapAsync(UserController.signinuser)
);

// for logout user
router.get("/logout",WrapAsync(UserController.signoutuser));

module.exports = router;
