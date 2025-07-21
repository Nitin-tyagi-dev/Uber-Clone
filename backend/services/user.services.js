import userModel from '../models/user.models.js';


export async function createUser({firstname , lastname , email , password}) {
    if(!firstname || !email || !password){
        throw new console.error('all field are required');
        
    }

    const user = userModel.create({
        fullname:{
            firstname,
            lastname
        },
        email,
        password
    })

    return user;
}