const mongoose = require("mongoose")
const passportLocalMongoose=require("passport-local-mongoose")
async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/wanderlust");
}
const userSchema = new mongoose.Schema(
    {
        email:
        {
            type: String,
            required:true,
        },
    }
)
userSchema.plugin(passportLocalMongoose);
const User = mongoose.model("User", userSchema)
module.exports = User;
