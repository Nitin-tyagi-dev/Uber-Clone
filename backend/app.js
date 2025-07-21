import { config } from 'dotenv';
config();

import express, { json, urlencoded } from 'express';
const app = express();

import cors from 'cors';

import connectToDb from './db/db.js';
import userRoutes from './routes/user.routes.js';

connectToDb(); 

app.use(cors());
app.use(json());
app.use(urlencoded({extended: true}));

app.get("/" , (req , res) => {
    res.send("hello world");
});

app.use('/users' , userRoutes);

export default app ;