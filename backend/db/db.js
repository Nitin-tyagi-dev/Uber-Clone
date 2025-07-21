import { connect } from 'mongoose';

function connectToDb(){
    connect(process.env.DB_CONNECT 
    ).then(() => {
        console.log('Connected to DB');
        }).catch(err => console.log(err));
}

export default connectToDb