// One-shot helper: lists video URLs in Cloudinary folder "fansvilla".
// Run: node scripts/list-hero-video.cjs
// Needs CLOUDINARY_CLOUD_NAME / CLOUDINARY_API_KEY / CLOUDINARY_API_SECRET in .env
const fs = require("fs");
const path = require("path");

const env = {};
for (const l of fs.readFileSync(path.join(__dirname, "..", ".env"), "utf8").split(/\r?\n/)) {
  const m = l.match(/^([A-Z_]+)=(.*)$/);
  if (m) env[m[1]] = m[2].replace(/^["']|["']$/g, "");
}

const cloudinary = require("cloudinary").v2;
cloudinary.config({
  cloud_name: env.CLOUDINARY_CLOUD_NAME,
  api_key: env.CLOUDINARY_API_KEY,
  api_secret: env.CLOUDINARY_API_SECRET,
});

cloudinary.api.search(
  { query: "resource_type:(video) AND folder:(fansvilla) AND public_id:*", max_results: 50 },
  (error, result) => {
    if (error) {
      console.error("CLOUDINARY ERROR:", error.message || error);
      process.exit(1);
    }
    const rows = (result.resources || []).map((a) => ({
      public_id: a.public_id,
      format: a.format,
      bytes: a.bytes,
      created_at: a.created_at,
      secure_url: a.secure_url,
    }));
    if (rows.length === 0) console.log("No videos found in folder 'fansvilla'.");
    for (const r of rows) console.log(JSON.stringify(r));
  }
);
