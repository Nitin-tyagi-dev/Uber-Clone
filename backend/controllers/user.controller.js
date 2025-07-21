import e from 'express';
import userModel from '../models/user.models.js'; 
import { validationResult } from 'express-validator';
import blacklistTokenModel from '../models/blacklistToken.model.js';

export async function registerUser(req, res, next) {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ error: errors.array() });
    }

    const { fullname, email, password } = req.body;

    const hashedPassword = await userModel.hashPassword(password);

    const user = await userModel.create({
      fullname: {
        firstname: fullname.firstname,
        lastname: fullname.lastname,
      },
      email,
      password: hashedPassword,
    });

    const token = user.generateAuthToken();

    res.status(201).json({ token, user });
  } catch (error) {
    next(error);
  }
}

export async function loginUser(req , res , next){
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({error: errors.array()});
    }
    const {email , password} = req.body;
    
    const user = await userModel.findOne({email}).select('+password');

    if(!user){
        return res.status(401).json({error: 'invalid email or password'});
    }

    const isMatch = await user.comparePassword(password);

    if(!isMatch){
        return res.status(401).json({error: 'invalid email or password'});
    }

    const token = user.generateAuthToken();

    res.cookie('token', token);

    res.status(200).json({token , user});
}

export async function getUserProfile(req, res, next) {
    
    res.status(200).json(req.user)
}

export async function logoutUser(req, res, next) {
    res.clearCookie('token');

    const token = req.cookies.token || req.headers.authorization.split(' ')[1];

    await blacklistTokenModel.create({ token });
    res.status(200).json({ message: 'Logged out successfully' });
}



