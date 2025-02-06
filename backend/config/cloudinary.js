const { v2: cloudinary } = require("cloudinary");

const connectCloudinary = async () => {
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: CLOUDINARY_API_KEY,
    api_secret: CLOUDINARY_SECRET_KEY,
  });
};

module.exports = connectCloudinary;
