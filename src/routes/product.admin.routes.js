const express=require("express");
const router=express.Router();
const productController=require("../controllers/product.controller.js");


router.post('/', productController.createProduct);
router.post('/creates', productController.createMultipleProduct);
router.delete('/:id/delete', productController.deleteProduct);
router.put('/:id', productController.updateProduct);
router.get('/recent', productController.getRecentProduct);

module.exports=router;