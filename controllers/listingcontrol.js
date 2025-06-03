const List = require("../models/Listing.js");
const ExpressError = require("../utils/ExpressError.js")
//control for all lists
module.exports.index = async (req, res, next) => {
  let lists = await List.find();
  // console.log(lists);
  res.render("./Listviews/showlists.ejs", { lists });
};
// control for show individual list
module.exports.showlist = async (req, res, next) =>
{
  let { id } = req.params;
  let list = await List.findById(`${id}`)
    .populate({ path: "reviews", populate: { path: "reviewer" } })
    .populate("owner");
  if (!list) {
    // next(new ExpressError(500, "list not find"));
    req.flash("error", "List you requested does not exist!");
    res.redirect("/lists");
  }
  // console.log(list);
  res.render("./Listviews/showlist.ejs", { list });
};
// control for render addlist form
module.exports.addform = async (req, res) =>
{
  // console.log(req.user);
  res.render("./Listviews/addlist.ejs");
};
// control for add new list
module.exports.addlist = async (req, res, next) =>
{
  let url = req.file.path;
  let filename = req.file.filename;
  if (!req.body.listing) {
    req.flash("error", "List details not found!");
    // next(new ExpressError(400, "Listing not found"));
    res.redirect("/lists");
  }
  let newlist = new List(req.body.listing);
  newlist.owner = req.user._id; // for list owner data store
  newlist.image = {url, filename};
  await newlist.save();
  req.flash("success", "List added successfully !");
  res.redirect("/lists");
};

// control for delete list
module.exports.deletelist = async (req, res, next) =>
{
    let { id } = req.params;
    let list=await List.findByIdAndDelete(`${id}`);
    if (!list) {
      next(new ExpressError(403, "List not found"));
    }
    req.flash("success", "List Deleted successfully !");
    res.redirect("/lists");
}
// control for render edit form
module.exports.editform = async (req, res, next) =>
{
  let { id } = req.params;
  const listing = await List.findById(`${id}`)
  if (!listing)
  {
    req.flash("error", "Requested Listing does not exist");
    res.redirect(`/lists/${id}`);
  }
  res.render("./Listviews/editlist.ejs", {listing});
}
//control for editlist 
module.exports.editlist = async (req, res, next) =>
{
  let { id } = req.params;
  let {
    new_title,
    new_description,
    new_price,
    new_location,
    new_country,
    new_image,
  } = req.body;
  let prevdata = await List.findById(`${id}`);
  if (!prevdata)
  {
    // next(new ExpressError(500, "Record not find"));
    req.flash("error", "List Details not find");
    res.redirect("/lists");
  }
  let listing=await List.findByIdAndUpdate(
    `${id}`,
    {
      title: new_title || prevdata.title,
      description: new_description || prevdata.description,
      price: new_price || prevdata.price,
      location: new_location || prevdata.location,
      country: new_country || prevdata.country,
    },
    { runValidators: "true" }
  );
  if (typeof req.file != "undefined")
  {
    let url = req.file.path;
    let filename = req.file.filename;
    listing.image = { url, filename }
    await listing.save();
  }
  req.flash("success", "List updated Successfully");
  res.redirect(`/lists/${id}`);
};

module.exports.searchList=async(req,res,next)=>
{
  const query = req.query.q;

    if (!query) {
        return res.redirect("/lists"); // redirect to all listings if empty
    }

    const regex = new RegExp(escapeRegex(query), 'gi'); // case-insensitive partial match

    const lists = await List.find({
      $or: [
          { title: regex },
          { location: regex },
          { country: regex },
          { description: regex }
      ]
  });

    res.render("./Listviews/searchResults.ejs", { lists, query });
}
function escapeRegex(text) {
  return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
}
