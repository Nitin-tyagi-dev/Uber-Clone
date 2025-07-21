import { Router } from 'express';
import { body } from 'express-validator';
const router = Router();
import { registerUser } from '../controllers/user.controller.js';

router.post('/register' , [
    body('email').isEmail().withMessage('Invalid Email'),
    body('fullname.firstname').isLength({ min: 3}).withMessage('First name should be 3 character long'),
    body('password').isLength({ min: 6}).withMessage('password must be character long')
],
    registerUser
)

export default router;