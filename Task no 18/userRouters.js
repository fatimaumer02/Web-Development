import express from 'express';
import { createUser, loginUser } from '../controller/userController.js';
import authMiddleware  from '../middleware/authmiddleware.js'
import getUsers from '../controller/userController.js';
const router = express.Router()

router.get('/' , authMiddleware , getUsers)
router.post('/api/signup', createUser)
router.post('/api/login', loginUser)





export default router;