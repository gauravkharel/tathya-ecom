const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    minlength: 3,
    maxlength: 255,
  },
  price: {
    type: Number,
    required: true,
    trim: true,
    maxlength: 5,
    default: 0.0,
  },
  description: {
    type: String,
    trim: true, 
    minlength: 3,
    maxlength: 255,
  },
  ratings: {
    type: Number,
    default: 0,
  },
  images: [
    {
      public_id: {
        type: String,
      },
      url: {
        type: String,
      },
    },
  ],
  category: {
    type: String,
    enum: {
      values: ["clothing", "accessories", "shoes", "bags", "others"],
      message: "Please select the mentioned category.",
    },
  },
  seller: {
    type: String,    
  },
  stock: {
    type: Number,
    maxlength: 5,
    default: 0,
  },
  numOfRatings: {
    type: Number,
    default: 0,
  },
  reviews: [
    {
      username: {
        type: String,
      },
      rating: {
        type: Number,
        required: true,
        maxlength: 5,
      },
      review: {
        type: String,
        required: true,
      },
    },
  ],
  color: {
    type: String,
    required: true,
    enum: {
      values: [
        "black",
        "white",
        "red",
        "blue",
        "green",
        "yellow",
        "orange",
        "purple",
        "pink",
        "brown",
        "grey",
        "silver",
        "gold",
        "others",
      ],
      message: "Please select through the option listed.",
    },
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

exports = mongoose.model("Product", productSchema);
