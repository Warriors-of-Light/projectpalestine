const mongoose = require('mongoose')

// Connect to MongoDB
export async function connectToDatabase() {

  try {

    await mongoose.connect(process.env.MONGODB_URL) 

  } catch (error) {

    console.error('Error while connecting to MongoDB', error)

  }

}