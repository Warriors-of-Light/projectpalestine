import mongoose from "mongoose";

const CompanySchema = new mongoose.Schema({
    id: String,
    logo: String,
    name: String,
    description: String,
    rating: Number,
    website: String,
    tags: [String],
    incidents: [
      {
        id: String,
        title: String,
        description: String,
        date: String,
        ups: Number,
        resource: [String]
      }
    ]
  })

export default mongoose.models.company || mongoose.model('company', CompanySchema)