import { Schema, model } from 'mongoose';
import { compare, hash } from 'bcrypt';
import jwt from "jsonwebtoken";
const { sign } = jwt;


const userSchema = new Schema({
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
        unique:true,
        minLength: [5,'email must be atleast 5 character long'],
    },
    password: {
        type:String,
        required:true,
        select:false
    },
    socketId: {
        type: String,
    }

})

userSchema.methods.generateAuthToken = function (){
    const token = sign({_id: this._id} , process.env.JWT_SECRET) 
    return token;
}

userSchema.methods.comparePassword = async function (password) {
    return await compare(password , this.password);
}

userSchema.statics.hashPassword = async (password) => {
    return await hash(password , 10);
}

const userModel = model('user' , userSchema);

export default userModel;
