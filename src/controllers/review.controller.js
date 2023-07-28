
const reviewService = require('../services/review.service.js');

const createReview = async (req, res) => {
  try {
    const user = req.user
    const reqBody = req.body;
    
    console.log(`product id ${reqBody.productId} - ${reqBody.review}`);
    
    const review = reviewService.createReview(reqBody, user);
        
    return res.status(202).send(review);
  } catch (error) {
    return res.status(500).json({ error: 'Something went wrong' });
  }
};

const getAllReview = async (req, res) => {
  try {
    const productId = req.params.productId;
    const reviews = reviewService.getAllReview(productId);
    return res.status(200).json(reviews);
  } catch (error) {
    res.status(500).json({ error: 'Something went wrong' });
  }
};

module.exports = {createReview,getAllReview}
