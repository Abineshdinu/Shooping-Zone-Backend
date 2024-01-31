const Product = require('../models/productModel');
const ErrorHandler = require('../utils/errorHandler')
const catchAsyncError = require('../Middlewares/catchAsyncError')

//get product
exports.getproducts = async (req, res, next) => {
  const products = await Product.find();
  res.status(200).json({
    success: true,
    count: products.length,
    products,
  });
};

//post-product

exports.newProduct = catchAsyncError (async (req, res, next) => {
  const product = await Product.create(req.body);
  res.status(201).json({
    success: true,
    product,
  });
});

//get -single -product
exports.getbyid = async (req, res, next) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    return next(new ErrorHandler('product-not-found',400));
  }
  res.status(201).json({
    success: true,
    product,
  });
};
//update

exports.updateproduct = async (req, res, next) => {
  let product = await Product.findById(req.params.id);

  if (!product) {
    return res.status(404).json({
      success: false,
      message: "product not found",
    });
  }
  product = await Product.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  res.status(200).json({
    success: true,
    product,
  });
};

//delete-product

exports.deleteproduct = async (req, res, next) => {
  const product = await Product.findById(req.params.id);

  if(!product) {
      return res.status(404).json({
          success: false,
          message: "Product not found"
      });
  }

  await product.deleteOne();

  res.status(200).json({
      success: true,
      message: "Product Deleted!"
  })

}


