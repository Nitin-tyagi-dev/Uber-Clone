import jwt from 'jsonwebtoken';
import userModel from '../models/user.models.js';

export async function authUser(req, res, next) {
    const token = req.cookies.token || req.headers.authorization?.split(' ')[1];

    if (!token) {
        return res.status(401).json({ error: 'Unauthorized access' });
    }

    const isblacklisted = await userModel.findOne({token : token});

    if (isblacklisted) {
        return res.status(401).json({ error: 'Token is blacklisted' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await userModel.findById(decoded._id);

        req.user = user;

        return next();
    } catch (err) {
        return res.status(401).json({ error: 'Unauthorized access' });
    }
}