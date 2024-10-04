const express = require('express');
const { addProduct, getAllProducts, updateProduct, deleteProduct } = require('../controllers/productController');
const upload = require('../middleware/uploadMiddleware');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/', authMiddleware, upload.single('image'), addProduct);
router.get('/', getAllProducts);
router.put('/:id', authMiddleware, upload.single('image'), updateProduct);
router.delete('/:id', authMiddleware, deleteProduct);
module.exports = router;
