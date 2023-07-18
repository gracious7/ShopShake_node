const Product = require("../models/product.model");

// Create a new product
async function createProduct(reqData) {
    const topLevel = await Category.findOne({ name: reqData.topLavelCategory() });
  
    if (!topLevel) {
      const topLavelCategory = new Category({
        name: reqData.topLavelCategory(),
        level: 1,
      });
  
      topLevel = await topLavelCategory.save();
    }
  
    let secondLevel = await Category.findOne({
      name: reqData.secondLavelCategory(),
      parentCategory: topLevel.name,
    });
  
    if (!secondLevel) {
      const secondLavelCategory = new Category({
        name: reqData.secondLavelCategory(),
        parentCategory: topLevel.name,
        level: 2,
      });
  
      secondLevel = await secondLavelCategory.save();
    }
  
    let thirdLevel = await Category.findOne({
      name: reqData.thirdLavelCategory(),
      parentCategory: secondLevel.name,
    });
  
    if (!thirdLevel) {
      const thirdLavelCategory = new Category({
        name: reqData.thirdLavelCategory(),
        parentCategory: secondLevel.name,
        level: 3,
      });
  
      thirdLevel = await thirdLavelCategory.save();
    }
  
    const product = new Product({
      title: reqData.title(),
      color: reqData.color(),
      description: reqData.description(),
      discountedPrice: reqData.discountedPrice(),
      discountPercent: reqData.discountPersent(),
      imageUrl: reqData.imageUrl(),
      brand: reqData.brand(),
      price: reqData.price(),
      sizes: reqData.size(),
      quantity: reqData.quantity(),
      category: thirdLevel._id,
    });
  
    const savedProduct = await product.save();
    console.log('products - ', product);
  
    return savedProduct;
  }
// Delete a product by ID
async function deleteProduct(productId) {
  const product = await findProductById(productId);

  await product.remove();

  return 'Product deleted Successfully';
}

// Update a product by ID
async function updateProduct(productId, reqData) {

  const updatedProduct = await Product.findByIdAndUpdate(productId,reqData)
  return updatedProduct;
}



// Find a product by ID
async function findProductById(id) {
  const product =await Product.findById(id)

  if(!product){
    throw new Error("Product not found with id "+ id);
  }

}



// Get all products with filtering and pagination
async function getAllProducts(
  category,
  colors,
  sizes,
  minPrice,
  maxPrice,
  minDiscount,
  sort,
  stock,
  pageNumber,
  pageSize
) {
  let query = Product.find();

  if (category) {
    query = query.where('category.name').equals(category);
  }

  if (colors) {
    const colorSet = new Set(colors);
    query = query.where('color').in([...colorSet]);
  }

  if (sizes) {
    const sizesSet = new Set(sizes);
    query = query.where('sizes.name').in([...sizesSet]);
  }

  if (minPrice && maxPrice) {
    query = query.where('discountedPrice').gte(minPrice).lte(maxPrice);
  }

  if (minDiscount) {
    query = query.where('discountPercent').gte(minDiscount);
  }

  if (stock) {
    if (stock === 'in_stock') {
      query = query.where('quantity').gt(0);
    } else if (stock === 'out_of_stock') {
      query = query.where('quantity').lte(0);
    }
  }

  if (sort) {
    const sortDirection = sort === 'price_high' ? -1 : 1;
    query = query.sort({ discountedPrice: sortDirection });
  }

  // Apply pagination
  const totalProducts = await query.countDocuments();
  const totalPages = Math.ceil(totalProducts / pageSize);
  const skip = (pageNumber - 1) * pageSize;

  query = query.skip(skip).limit(pageSize);

  const products = await query.exec();

  return {
    products,
    currentPage: pageNumber,
    totalPages,
  };
}

module.exports = {
  createProduct,
  deleteProduct,
  updateProduct,
  getAllProducts,
  findProductById,
 
};
