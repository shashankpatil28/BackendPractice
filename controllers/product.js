const Product = require("../models/product.models"); // Change the model to Product

const getAllProducts = async (req, res) => {
    try {

        console.log(req.user);
        
        const allProducts = await Product.find({}, {
            id: true,
            name: true,
            price: true // Replace 'age' with 'price'
        }).exec();

        return res.status(200).json({
            success: true,
            message: 'Data for all products fetched successfully',
            data: allProducts,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Failed to show all products',
            error: error.message,
        });
    }
};

const createProduct = async (req, res) => {
    try {
        const { id, name, price } = req.body;
        if (!id || !name || !price) {
            return res.status(400).json({
                success: false,
                message: 'ID and Name are required',
            });
        }

        const newProduct = await Product.create({
            id,
            name,
            price
        });

        return res.status(201).json({
            success: true,
            newProduct,
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Failed to add a new product',
            error: error.message,
        });
    }
};

const getProductById = async (req, res) => {
    try {
        const { id } = req.params;

        if (!id) {
            return res.status(400).json({
                success: false,
                message: 'ID is required in the request parameters',
            });
        }

        const product = await Product.findOne({
            id
        }, {
            id: true,
            name: true,
            price: true // Include 'price' in the query result
        });

        if (!product) {
            return res.status(404).json({
                success: false,
                message: 'No such product with this ID found in the database',
            });
        }

        return res.status(200).json({
            success: true,
            message: 'Data for required product fetched successfully',
            data: product,
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Failed to fetch the required product',
            error: error.message,
        });
    }
};

const updateProduct = async (req, res) => {
    try {
        const param = req.params;
        const { name, price } = req.body;

        if(!name || !price){
            return res.status(400).json({
                success: false,
                message: 'All fields are required.',
            });
        }

        const product = await Product.findOne({
            id : param.id
        });

        if(!product){
            return res.status(404).json({
                success: false,
                message: 'Product not found.',
            });
        }

        product.name = name;
        product.price = price;

        await product.save();

        return res.status(200).json({
            success: true,
            message: 'Product updated successfully.',
            product,  
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Failed to update the product.',
            error: error.message,
        });
    }
};


const deleteProduct = async(req, res) => {
    try {
        const { id } = req.params;

        const product = await Product.findOneAndDelete({id});
        if(!product) {
            return res.status(404).json({
                success: false,
                message: 'No such product with this ID found in the database',
            });
        }

        return res.status(200).json({
            success: true,
            message: "Product deleted successfully",
          })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Server error",
            error: error.message,
          })
    }
}

module.exports = { getAllProducts, createProduct, getProductById, updateProduct, deleteProduct };
