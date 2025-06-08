const multer=require('multer');
const {CloudinaryStorage}=require("multer-storage-cloudinary");
const cloudinary=require("cloudinary").v2;
require("dotenv").config();

// Configure cloudinary

cloudinary.config({
    cloud_name:process.env.CLOUD_NAME,
    api_key:process.env.CLOUD_API_KEY,
    api_secret:process.env.CLOUD_API_SECRET,
});

const storage=new CloudinaryStorage({
    cloudinary:cloudinary,
    params:{
        folder:"uploads",
        allowed_formats:["jpg","jpeg","png"],
        public_id:(req,file)=>`${Date.now()}-${file.originalname}`,
    }
});
const upload=multer({storage});
module.exports=upload;