import mongoose from "mongoose";

const blacklistTokenSchema = new mongoose.Schema({
    token: { 
        type: String,
        required: true,
        unique: true
    },
    createdAt: {
        type: Date,
        default: Date.now,
        expires: '86400' 
    }
});

export default mongoose.model('BlacklistToken', blacklistTokenSchema);