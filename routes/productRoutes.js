const express = require("express");
const router = express.Router();
const { auth } = require("../middlewares/auth.js")

const { getAllProducts, createProduct, getProductById, updateProduct, deleteProduct } = require("../controllers/product"); // Update import to 'product'

router.get("/", auth, getAllProducts); // Fetch all products
router.get("/:id", auth, getProductById); // Fetch product by ID
router.post("/", auth, createProduct); // Create a new product
router.put("/:id", auth, updateProduct); // Update product by ID
router.delete("/:id", auth, deleteProduct); // Delete product by ID

module.exports = router;
