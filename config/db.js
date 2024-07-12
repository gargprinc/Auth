const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

const connectDB = async() => {
    try{
        await mongoose.connect(process.env.MONGO_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
           
        });
        console.log('MongoDB connected...');
    }catch(err){
        console.log("error connecting to mongodb", err)
        process.exit(1);
    }
}
module.exports  = connectDB;