import { Request, Response } from 'express';
import Product, { IProduct } from "../models/Product";

export const getProducts = async (req: Request, res: Response) => {
    const products: IProduct[] = await Product.find();
    res.status(200).json(products);
};

export const getProductById = async (req: Request, res: Response) => {
    const product: IProduct | null = await Product.findById(req.params.id);
    res.status(200).json(product);
};

export const createProduct = async (req: Request, res: Response) => {
    const { name, category, price, imgURL } = req.body;
    const newProduct: IProduct = new Product({ name, category, price, imgURL });
    const createdProduct = await newProduct.save();
    res.status(201).json(createdProduct);
};

export const updateProductById = async (req: Request, res: Response) => {
    const { name, category, price, imgURL } = req.body;
    const updatedProduct: IProduct | null = await Product.findByIdAndUpdate(req.params.id, { name, category, price, imgURL }, { new: true });
    res.status(200).json(updatedProduct);
};

export const deleteProductById = async (req: Request, res: Response) => {
    await Product.findByIdAndDelete(req.params.id);
    res.status(204).json();
};