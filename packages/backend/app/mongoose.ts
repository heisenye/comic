import mongoose from 'mongoose'
const MONGODB_URI = process.env.MONGODB_URI

const connect = async () => {
  try {
    await mongoose.connect(MONGODB_URI as string)
  } catch (err) {
    console.error(err)
  }
}

export default connect
