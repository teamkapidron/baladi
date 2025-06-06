import mongoose from 'mongoose';

export default async function connectToMongo() {
  try {
    if (!process.env.MONGO_URI) {
      throw new Error('MONGO_URI is not defined');
    }
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to MongoDB');
  } catch (error: unknown) {
    console.error('Error connecting to MongoDB', error);
  }
}
