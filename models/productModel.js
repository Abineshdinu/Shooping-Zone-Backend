const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "product name is required"],
    trim: true,
    maxLength: [100, "product name cannot exceed 100 char"],
  },

  price: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    required: [true, "description need "],
  },
  ratings: {
    type: String,
    default: 0,
  },
  images: [
    {
      image: {
        type: String,
        required: true,
      },
    },
  ],

  category: {
    type: String,
    required: [true, "enter the catergory"],
    enum: {
      values: [
        "Electronics",
        "Books",
        "Mobile phones",
        "Accessories",
        "HeadPhones",
        "Food",
        "Clothes/Shoes",
        "Sports",
        "Beauty/Health",
        "Home",
      ],
      message: "please select the correct category",
    },
  },

  seller: {
    type: String,
    required: [true, "Enter product seller"],
  },
  stock: {
    type: Number,
    required: true,
    maxLength: [20, "product stock cannot exceed 20"],
  },
  numOfReviews: {
    type: Number,
    default: 0,
  },

  reviews: [
    {
      name: {
        type: String,
        required: true,
      },
      rating: {
        type: String,
        required: true,
      },
      comment: {
        type: String,
        required: true,
      },
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

let Schema = mongoose.model('product',productSchema)
module.exports =Schema