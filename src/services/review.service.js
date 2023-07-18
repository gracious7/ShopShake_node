const Review = require("../models/review.model.js");
const productService=require("../services/product.service.js")

async function createReview(req, user) {
  const product = await productService.findProductById(req.productId);
  
  const review = new Review({
    user: user._id,
    product: product._id,
    review: req.review,
    createdAt: new Date(),
  });
  
  await product.save();
  return await review.save();
}

async function getAllReview(productId) {
  return await Review.find({ product: productId });
}


module.exports = {
  createReview,
  getAllReview,
};
