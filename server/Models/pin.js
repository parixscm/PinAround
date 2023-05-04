const mongoose = require("mongoose");

const pinSchema = new mongoose.Schema(
  {
    username: { type: String, required: true },
    place: { type: String, required: true, minLength: 1 },
    review: { type: String, required: true, minLength: 3 },
    rating: { type: Number, required: true, min: 0, max: 5 },
    lat: { type: Number, required: true },
    lng: { type: Number, required: true },
  },
  { timestamps: true }
);

const pinModel = mongoose.model("Pin", pinSchema);
module.exports = pinModel;
