const mongoose = require("mongoose");

const accommodationSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    extraPrice: {
      type: Number,
      required: false,
    },
    capacity: {
      type: Number,
      required: true,
    },
    image: {
      type: String,
      required: false,
    },
    address: {
      type: String,
      required: true,
    },
    amenities: {
      wifi: Boolean,
      kitchen: Boolean,
      tv: Boolean,
      airConditioning: Boolean,
      heating: Boolean,
      freeParking: Boolean,
    },
  },
  { timestamps: true }
);

const Accommodation = mongoose.model("Accommodation", accommodationSchema);

module.exports = Accommodation;
