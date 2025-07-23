import captainModel from '../models/captain.model.js';
import { validationResult } from 'express-validator';  

export async function registerCaptain(req, res, next) {
    try {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({ error: errors.array() });
        }

        const { fullname, email, password, vehicle } = req.body;

        const isEmailExists = await captainModel.findOne({ email });
        if (isEmailExists) {
            return res.status(400).json({ error: 'captain already exists' });
        }  

        const hashedPassword = await captainModel.hashPassword(password);

        const captain = await captainModel.create({
            fullname: {
                firstname: fullname.firstname,
                lastname: fullname.lastname
            },
            email,
            password: hashedPassword,
            vehicle: {
                color: vehicle.color,
                plate: vehicle.plate,
                capacity: vehicle.capacity,
                vehicleType: vehicle.vehicleType
            }
        });

        const token = captain.generateAuthToken();

        res.status(201).json({ token , captain });
    } catch (error) {
        next(error);
    }

}

