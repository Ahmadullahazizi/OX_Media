import mongoose from 'mongoose';

const connectDB = async()=>{

 try {
    const connect = mongoose.connect(`${process.env.MONGOOSE_URL}`);
    console.log(`Mongo DB connection successfull - ${(await connect).connection.host}`.bgBlue);
    
 } catch (error) {
    console.log(`Mongoose Connection error - ${error}`.bgRed)
    
 }
}

export default connectDB