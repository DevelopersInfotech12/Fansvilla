import { v2 as cloudinary } from "cloudinary";
import streamifier from "streamifier";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// resourceType: "image" | "video" | "auto"
export const uploadToCloudinary = (buffer, folder, resourceType = "image") =>
  new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      { folder, resource_type: resourceType },
      (error, result) => {
        if (error) {
          console.error("CLOUDINARY ERROR:", JSON.stringify(error, null, 2));
          return reject(error);
        }
        resolve(result);
      }
    );
    stream.on("error", (err) => {
      console.error("CLOUDINARY STREAM ERROR:", err);
      reject(err);
    });
    streamifier.createReadStream(buffer).pipe(stream);
  });

export default cloudinary;
