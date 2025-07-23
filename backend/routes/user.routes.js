import { Router } from 'express';
import { body } from 'express-validator';
const router = Router();
import * as userController from '../controllers/user.controller.js';
import { get } from 'mongoose';
import * as authMiddleware  from '../middlewares/auth.middleware.js'

router.post('/register' , [
    body('email').isEmail().withMessage('Invalid Email'),
    body('fullname.firstname').isLength({ min: 3}).withMessage('First name should be 3 character long'),
    body('password').isLength({ min: 6}).withMessage('password must be character long')
],
    userController.registerUser
);

router.post('/login',[
    body('email').isEmail().withMessage('Invalid Email'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long')
],
    userController.loginUser
)

router.get('/profile',authMiddleware.authUser ,userController.getUserProfile); 

router.get('/logout', authMiddleware.authUser ,userController.logoutUser);

export default router;