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
      required: true,
      min: [0, "Price can't be negative"],
    },
    location: {
      type: [String],
      required: true,
    },
    day: {
      type: Number,
      required: true,
      min: [1, "Day can't be zero"],
    },
    status: {
      type: String,
      required: true,
      enum: {
        values: ["in-stock", "out-of-stock", "discontimued"],
        message: "status can't be {VALUES}",
      },
    },
    viewCount: {
      type: Number,
      required: true,
      min: [0, "initial view can't be less then 0"],
      max: [0, "initial view can't be more then 0"],
    },
  },
  {
    timestamps: true,
  }
);

// // SCHEMA -> MODEL -> QUERY

const Tour = mongoose.model("Tour", tourSchema);

module.exports = Tour;
