// productController.js
const productService = require("../services/product.service.js")

// Create a new product
async function createProduct(req, res) {
  try {
    const product = await productService.createProduct(req.body);
    return res.status(201).json(product);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}

// Delete a product by ID
async function deleteProduct(req, res) {
  try {
    const productId = req.params.id;
    const message = await productService.deleteProduct(productId);
    return res.json({ message });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}

// Update a product by ID
async function updateProduct(req, res) {
  try {
    const productId = req.params.id;
    const product = await productService.updateProduct(productId, req.body);
    res.json(product);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

// Get all products
// async function getAllProducts(req, res) {
//   try {
//     const products = await productService.getAllProducts();
//     res.json(products);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// }

// Find a product by ID
async function findProductById(req, res) {
  try {
    const productId = req.params.id;
    const product = await productService.findProductById(productId);
    return res.status(200).send(product);
  } catch (err) {
    return res.status(404).json({ message: err.message });
  }
}

// Find products by category
async function findProductByCategory(req, res) {
  try {
    const category = req.params.category;
    const products = await productService.findProductByCategory(category);
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

// Search products by query
async function searchProduct(req, res) {
  try {
    const query = req.params.query;
    const products = await productService.searchProduct(query);
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

// Get all products with filtering and pagination
async function getAllProducts(req, res) {
  try {

    const products = await productService.getAllProducts(req.query);
    const totalProducts = products.length;
    const totalPages = Math.ceil(totalProducts / req.query.pageSize);
    return res.status(200).send({content:products,currentPage: req.query.pageNumber,
      totalPages,});
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}

module.exports = {
  createProduct,
  deleteProduct,
  updateProduct,
  getAllProducts,
  findProductById,
  findProductByCategory,
  searchProduct,

};
