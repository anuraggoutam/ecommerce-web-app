import mongoose from 'mongoose';


const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URL);
    console.log(`Mongo Connected: ${conn.connection.host}`);
  } catch (error) {
    console.log(error);
    process.exit(1); //this use to stop process
  }
};

export default connectDB;
