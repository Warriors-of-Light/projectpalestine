import mongoose from "mongoose"

const userSchema = new mongoose.Schema({
    id: String,
    email: String,
    password: String,
    verified_email: Boolean,
    name: String,
    given_name: String,
    family_name: String,
    picture: String,
    locale: String,
    cookie: String
})

export default mongoose.models.user || mongoose.model('user', userSchema)