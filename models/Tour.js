const mongoose = require("mongoose");
// schema design

const tourSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please privide a name for this tour."],
      trim: true,
      unique: [true, "Name must be unique!"],
      minLength: [3, "Name must be at least 3 characters."],
      maxLength: [100, "Name is too large"],
    },
    image: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      require: true,
      min: [0, "Price can't be negative"],
    },
    location: {
      type: Array,
      required: true,
    },
    day: {
      type: Number,
      require: true,
      min: [1, "Day can't be zero"],
    },
    status: {
      type: String,
      require: true,
      enum: {
        values: ["in-stock", "out-of-stock", "discontimued"],
        message: "status can't be {VALUES}",
      },
    },
  },
  {
    timestamps: true,
  }
);

// // SCHEMA -> MODEL -> QUERY

const Tour = mongoose.model("Tour", tourSchema);

module.exports = Tour;
