const Product = require("../models/productModel");

exports.getproducts = (req, res, next) => {
  res.status(200).json({
    success: true,
    message: "hi",
  });
};

exports.newProduct = async(req , res, next) => {
  const  product = await  Product.create(req.body);
  res.status(201).json({
    success:true,
    product
  })

};
