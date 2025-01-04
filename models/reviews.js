const mongoose = require("mongoose")
const reviewSchema = new mongoose.Schema({
  comment:
  {
    type: String,
    required: true,
  },
  rating:
  {
    type: Number,
    min: 1,
    max: 5,
    required: true,
  },
  created_at: {
    type: Date,
    default: Date.now(),
    required: true,
  },
  reviewer:
  {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
  }
});
const Review = mongoose.model("Review", reviewSchema);
// const Addreview = async () =>
// {
//   let firstreview = new Review(
//     {
//       comment: "What'a a post!",
//       rating:4
//     }
//   )
//   await firstreview.save();
//   console.log(firstreview)
// }
// Addreview();

module.exports = Review;

