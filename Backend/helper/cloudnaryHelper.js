import { v2 as cloudinary } from 'cloudinary';
import dotenv from "dotenv";
import fs from "fs";

dotenv.config();
 // Configuration
 cloudinary.config({ 
    cloud_name: process.env.CLOUD_NAME, 
    api_key: process.env.API_KEY, 
    api_secret: process.env.API_SECRET// Click 'View API Keys' above to copy your API secret
});

const uploadFileOnCloudnary  = async(filePath , folderName) =>{
    try {//upload File on cloudnary
        const result = await cloudinary.uploader.upload(filePath, {
            folder: folderName
        });
        try {//When uploaded to cloudinary delete from our server
            fs.unlinkSync(filePath);
        } catch (error) {
            console.log(`Failled to Delete file from Server : ${error}`);
        }
        console.log(result);
        return {
            secure_url :  result.secure_url,
            public_id :  result.public_id,

        }
    } catch (error) {
        throw new Error(error);
    }
}
const deleteFileFromCloudnary = async (public_id) =>{
    try {
        const result =  await cloudinary.uploader.destroy(public_id);
        return result;
    } catch (error) {
        throw new Error(error);
    }
}
export {uploadFileOnCloudnary ,deleteFileFromCloudnary}