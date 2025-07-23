import { Schema, model } from 'mongoose';
import { compare, hash } from 'bcrypt';
import jwt from "jsonwebtoken";
const { sign } = jwt;


const captainSchema = new Schema({
    fullname: {
        firstname: {
        type:String,
        required: true,
        minLength: [3 , 'First name must be atleast 3 character long']
        },
        lastname: {
            type:String,
            minLength: [3 , 'last name must be atleast 3 character long']
        }
    },

    email:{
        type:String,
        required:true,
        minLength: [5,'email must be atleast 5 character long'],
    },

    password: {
        type:String,
        required:true,
        select:false
    },

    socketId: {
        type: String,
    },

    status:{
        type: String,
        enum: ['active', 'inactive'],
        default: 'inactive'
    },

    vehicle: {
        color: {
            type: String,
            required: true,
            minLength: [3, 'Color must be atleast 3 character long']
        },
        plate: {
            type: String,
            required: true,
            minLength: [3, 'Plate must be atleast 3 character long']
        },
        capacity: {
            type: Number,
            required: true,
            min: [1, 'Capacity must be atleast 1']
        },
        vehicleType: {
            type: String,
            required: true,
            enum: ['car', 'motorcycle', 'auto'],
        }
        
    },

    location: {

        
        lat: {
            type: Number
        },
        lng: {
            type: Number
        }
    }

})

captainSchema.methods.generateAuthToken = function (){
    const token = sign({_id: this._id} , process.env.JWT_SECRET , {expiresIn: '24h'});
    return token;
}

captainSchema.methods.comparePassword = async function (password) {
    return await compare(password , this.password);
}

captainSchema.statics.hashPassword = async (password) => {
    return await hash(password , 10);
}

const captainModel = model('captain' , captainSchema);

export default captainModel;
