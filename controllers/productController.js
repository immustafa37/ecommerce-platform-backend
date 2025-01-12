const Product = require('../models/productModel');

// Add a new product with an image upload
const addProduct = async (req, res) => {
  const { name, description, price } = req.body;
  const image = req.file ? req.file.path : null; // Ensure correct handling of image uploads

  try {
    const product = new Product({
      name,
      description,
      price,
      image,
      user: req.user._id, // Assuming you have user authentication
    });

    await product.save();
    res.status(201).json({ message: 'Product added successfully', product });
  } catch (error) {
    res.status(500).json({ message: 'Error adding product', error });
  }
};

// Get all products
const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find({});
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching products', error });
  }
};

// Update a product
const updateProduct = async (req, res) => {
  const { name, description, price } = req.body;

  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    product.name = name || product.name;
    product.description = description || product.description;
    product.price = price || product.price;

    if (req.file) {
      product.image = req.file.path;
    }

    await product.save();
    res.json({ message: 'Product updated successfully', product });
  } catch (error) {
    res.status(500).json({ message: 'Error updating product', error });
  }
};

// Delete a product
const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    await product.remove();
    res.json({ message: 'Product deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting product', error });
  }
};

module.exports = { addProduct, getAllProducts, updateProduct, deleteProduct };