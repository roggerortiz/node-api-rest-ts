import Product from "../models/Product";

export const getProducts = async (req, res) => {
    const products = await Product.find();
    res.status(200).json(products);
};

export const getProductById = async (req, res) => {
    console.log(req.user);
    const product = await Product.findById(req.params.id);
    res.status(200).json(product);
};

export const createProduct = async (req, res) => {
    const { name, category, price, imgURL } = req.body;
    const newProduct = new Product({ name, category, price, imgURL });
    const createdProduct = await newProduct.save();
    res.status(201).json(createdProduct);
};

export const updateProductById = async (req, res) => {
    const { name, category, price, imgURL } = req.body;
    const updatedProduct = await Product.findByIdAndUpdate(req.params.id, { name, category, price, imgURL }, { new: true });
    res.status(200).json(updatedProduct);
};

export const deleteProductById = async (req, res) => {
    await Product.findByIdAndDelete(req.params.id);
    res.status(204).json();
};