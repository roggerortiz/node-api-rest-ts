import { Router } from 'express';
import { createUser, deleteUserById, getUserById, getUsers, updateUserById } from '../controllers/user.controller';

const router = Router();
router.get('/', getUsers);
router.get('/:id', getUserById);
router.post('/', createUser);
router.put('/:id', updateUserById);
router.delete('/:id', deleteUserById);

export default router;