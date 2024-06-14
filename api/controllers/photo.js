const imageDownloader = require("image-downloader");
const path = require("path");
const fs = require("fs");

const getUploadDir = () => path.join(__dirname, "..", "uploads");

const uploadPhotoByLink = async (req, res, next) => {
  const { link } = req.body;
  const newName = "photo" + Date.now() + ".jpg";
  const uploadDir = getUploadDir();

  try {
    await imageDownloader.image({
      url: link,
      dest: path.join(uploadDir, newName),
    });
    res.status(201).json(newName);
  } catch (error) {
    console.error("Error downloading image:", error);
    next(error);
  }
};

const uploadPhotoByFile = (req, res, next) => {
  const uploadedFiles = [];
  const uploadDir = getUploadDir();

  try {
    for (let i = 0; i < req.files.length; i++) {
      const { path: tempPath, originalname } = req.files[i];
      const parts = originalname.split(".");
      const ext = parts[parts.length - 1];
      const newName = path.basename(tempPath) + "." + ext;
      const newPath = path.join(uploadDir, newName);

      fs.renameSync(tempPath, newPath);
      uploadedFiles.push(newName);
    }
    res.status(200).json(uploadedFiles);
  } catch (error) {
    console.error("Error uploading photo by link:", error);
    next(error);
  }
};
/*
You just need to use the given code if you want to delete images in Visual Studio Code (VSCode). If there is no need to delete the image, then there is no need to use the code.

const deletePhoto = (req, res, next) => {
  const { filename } = req.body;
  const uploadDir = getUploadDir();
  const filePath = path.join(uploadDir, filename);

  try {
    if (fs.existsSync(filePath)) {
      fs.unlink(filePath, (err) => {
        if (err) {
          console.error("Error deleting file:", err);
          return res.status(500).json({ message: "Failed to delete file" });
        }
        res.status(200).json({ message: "File deleted successfully" });
      });
    } else {
      res.status(404).json({ message: "File not found" });
    }
  } catch (error) {
    console.error("Error File deleted:", error);
    next(error);
  }
};
*/

module.exports = {
  uploadPhotoByLink,
  uploadPhotoByFile,
  // deletePhoto,
};
