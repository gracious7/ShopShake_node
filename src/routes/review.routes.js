const express = require("express");
const authenticate = require("../middleware/authenticat.js");
const router = express.Router();
const reviewController = require("../services/review.service.js");

router.get("/create",authenticate,reviewController.createReview);
router.put("/product/:productId",authenticate,reviewController.getAllReview);


module.exports=router;