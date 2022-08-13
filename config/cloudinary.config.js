const cloudinary = require("cloudinary");

const { ClOUD_NAME, API_KEY, API_SECRET } = process.env;

cloudinary.config({
  cloud_name: ClOUD_NAME,
  api_key: API_KEY,
  api_secret: API_SECRET,
});

const uploads = (file, folder) => {
  return new Promise((resolve) => {
    cloudinary.v2.uploader.upload(
      file,
      {
        resource_type: "auto",
        folder: folder,
      },
      (error, result) => {
        resolve({ url: result.url, id: result.public_id });
      }
    );
  });
};

module.exports = { uploads };
