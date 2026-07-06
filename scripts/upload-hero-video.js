// Run once: node scripts/upload-hero-video.js
// Uploads public/hero-video.mp4 to Cloudinary using chunked upload (handles large files).
// Prints the secure_url — paste that into .env.local as NEXT_PUBLIC_HERO_VIDEO_URL.

require("dotenv").config({ path: ".env.local" });
const cloudinary = require("cloudinary").v2;
const path = require("path");

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const filePath = path.join(__dirname, "..", "public", "hero-video.mp4");

console.log("Uploading:", filePath);

cloudinary.uploader.upload_large(
  filePath,
  {
    resource_type: "video",
    folder: "fansvilla",
    chunk_size: 20 * 1024 * 1024, // 20MB chunks, safe for big files
  },
  (error, result) => {
    if (error) {
      console.error("UPLOAD FAILED:", error);
      process.exit(1);
    }
    console.log("\n✅ Upload complete!");
    console.log("secure_url:", result.secure_url);
    console.log("\nPaste this into .env.local:");
    console.log(`NEXT_PUBLIC_HERO_VIDEO_URL=${result.secure_url}`);
  }
);
