import mongoose from "mongoose"

const userSchema = new mongoose.Schema({
    id: { type: String, required: false },
    email: { type: String, required: true },
    password: { type: String, required: false },
    verified_email: { type: Boolean, required: false },
    name: { type: String, required: true },
    given_name: { type: String, required: false },
    family_name: { type: String, required: false },
    picture: { type: String, required: true },
    locale: { type: String, required: false },
    cookie: { type: String, required: true }
})

export default mongoose.models.user || mongoose.model('user', userSchema)