import { Router } from 'express';
import { body } from 'express-validator';
const router = Router();
import * as userController from '../controllers/user.controller.js';

router.post('/register' , [
    body('email').isEmail().withMessage('Invalid Email'),
    body('fullname.firstname').isLength({ min: 3}).withMessage('First name should be 3 character long'),
    body('password').isLength({ min: 6}).withMessage('password must be character long')
],
    userController.registerUser
)

router.get('/login',[
    body('email').isEmail().withMessage('Invalid Email'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long')
],
userController.loginUser
)

export default router;