import { Router } from 'express';
import { createProduct, deleteProductById, getProductById, getProducts, updateProductById } from '../controllers/product.controller';

const router: Router = Router();
router.get('/', getProducts);
router.get('/:id', getProductById);
router.post('/', createProduct);
router.put('/:id', updateProductById);
router.delete('/:id', deleteProductById);

export default router;