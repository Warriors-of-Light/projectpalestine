import mongoose from "mongoose";

const verificationCodeSchema = new mongoose.Schema({
    email: String,
    code: String
})

export default mongoose.models.verificationCode || mongoose.model('verificationCode', verificationCodeSchema)