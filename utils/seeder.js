const products = require("../data/products.json");
const Product = require("../models/productModel");
const db = require("../db/db");
const dotenv = require("dotenv");
dotenv.config();
db();

const seedProducts = async () => {
    try {
      await Product.deleteMany();
      console.log("products deleted!");
      await Product.insertMany(products);
      console.log("All products added!");
    } catch (error) {
      if (error.name === 'ValidationError') {
        console.log('Validation Errors:', error.errors);
      } else {
        console.log(error.message);
      }
    }
    process.exit();
  };
  
seedProducts();
