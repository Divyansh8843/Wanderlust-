const mongoose = require("mongoose")
const listSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    url: String,
    filename: String,
  },
  price: {
    type: Number,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  country: {
    type: String,
    required: true,
  },
  reviews: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Review",
    },
  ],
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  // geometry: {
  //   type: {
  //     type: String, // Don't do `{ location: { type: String } }`
  //     enum: ["Point"], // 'location.type' must be 'Point'
  //     required: true,
  //   },
  //   coordinates: {
  //     type: [Number],
  //     required: true,
  //   },
  // },
});
const List = mongoose.model("List", listSchema)
module.exports = List;








