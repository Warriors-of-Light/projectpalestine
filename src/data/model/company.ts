import mongoose from "mongoose";

const CompanySchema = new mongoose.Schema({
    id: String,
    logo: String,
    name: String,
    description: String,
    rating: Number,
    website: String,
    tags: Array,
    incidents: Array,
})

export default mongoose.models.company || mongoose.model('company', CompanySchema)