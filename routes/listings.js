const express = require("express")
const router = express.Router({ mergeParams: true }); // router object 
const WrapAsync = require("../utils/wrapasync.js");
const passport = require("passport");
const { isLoggedIn,isOwner } = require("../middleware.js");
const { link } = require("joi");
const ListsController = require("../controllers/listingcontrol.js");
const multer = require("multer")
const { storage } = require("../CloudConfig.js");
const upload = multer({ storage })

// show all lists
router.get("/",WrapAsync(ListsController.index));
// show particular listing

router.get("/:id",WrapAsync(ListsController.showlist));

// delete a list from listings
router.get("/:id/delete", isLoggedIn, isOwner, WrapAsync(ListsController.deletelist));

// edit a list from listing(combine on same route)
router.route("/:id/edit").get(isOwner, isLoggedIn, WrapAsync(ListsController.editform)).post(isOwner, isLoggedIn, upload.single('new_image'), WrapAsync(ListsController.editlist));

router.get("/list/search",WrapAsync(ListsController.searchList))

module.exports = router;





