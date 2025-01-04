const mongoose = require("mongoose");
main().catch((err) => console.log(err)).then(() =>
{
  console.log("connection successful");
});
async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/wanderlust");
}
const List = require("../models/Listing.js");
const initdata = require("./data.js");
const initDB = async () => {
  await List.deleteMany({});
  initdata.data = initdata.data.map((obj) => ({...obj,owner:"6773896b3e1ef6343d501be5"}));
  await List.insertMany(initdata.data);
  console.log("data was initialized")
}
initDB()
