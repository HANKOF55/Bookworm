// core modules
import multer from "multer";
import CloudinaryStorage from "multer-storage-cloudinary";
import crypto from "crypto";    

// local modules
import cloudinary from "../config/cloudinary.config.js";

const fileFilter = (req, file, cb) => {
  const allowedTypes = [
    "image/jpeg",
    "image/png",
    "image/webp",
    "image/jpg",
  ];

  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error("Only image files are allowed"), false);
  }
};

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "bookworm/uploads",
    public_id: (req, file) => `${file.fieldname}_${crypto.randomUUID()}`
  },
});

export const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 1 * 1024 * 1024, // 1MB
  },
});


// deleteFile
export const deleteFile = async (publicId) => {
    if (!publicId) return;
  
    try {
      await cloudinary.uploader.destroy(publicId);
    } catch (error) {
      console.error("Cloudinary delete failed:", error.message);
    }
  };