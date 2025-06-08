const mongoose=require("mongoose");
const connectDB=async()=>{
    try{
        await mongoose.connect(process.env.MONGO_URL,{});
        console.log(" MongoDB connected successfully");
        // process.exit(1);
    }
    catch(err){
        console.error("Error connecting to Mongodb",err);
        process.exit(1)
    }
};
module.exports=connectDB;

