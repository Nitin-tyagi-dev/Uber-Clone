import { config } from 'dotenv';
config();

import express, { json, urlencoded } from 'express';
const app = express();

import cors from 'cors';

import connectToDb from './db/db.js';
import userRoutes from './routes/user.routes.js';
import captainRoutes from './routes/captain.routes.js';

import cookieParser from 'cookie-parser';

connectToDb(); 

app.use(cors());
app.use(json());
app.use(urlencoded({extended: true}));
app.use(cookieParser());

app.get("/" , (req , res) => {
    res.send("hello world");
});

app.use('/users' , userRoutes);
app.use('/captains', captainRoutes);

export default app ;