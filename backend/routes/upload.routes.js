import path from "path";
import express from "express";
import multer from "multer";
import fs from 'fs';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const router = express.Router();

// Get current directory
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Create uploads directory if it doesn't exist
const uploadDir = path.join(__dirname, '../../uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + '-' + file.originalname.replace(/\s+/g, '-'));
  }
});

const fileFilter = (req, file, cb) => {
  const allowedTypes = ["image/jpeg", "image/png", "image/gif", "image/webp"];
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error("Invalid file type. Only JPG, PNG, GIF and WebP are allowed."), false);
  }
};

const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024 // 5MB limit
  }
});

router.post("/", (req, res) => {
  console.log("Received file upload request");

  try {
    upload.single('file')(req, res, function (err) {
      if (err instanceof multer.MulterError) {
        console.error("Multer error:", err);
        if (err.code === 'LIMIT_FILE_SIZE') {
          return res.status(400).json({ message: "File size too large. Max size is 5MB." });
        }
        return res.status(400).json({ message: err.message });
      } else if (err) {
        console.error("Upload error:", err);
        return res.status(400).json({ message: err.message });
      }

      if (!req.file) {
        console.error("No file in request");
        return res.status(400).json({ message: "No file uploaded" });
      }

      // Verify file exists on disk
      const filePath = req.file.path;
      if (!fs.existsSync(filePath)) {
        console.error("File not found on disk after upload");
        return res.status(500).json({ message: "File upload failed - file not found" });
      }

      // Return the relative path from uploads directory
      const relativePath = path.relative(uploadDir, req.file.path).replace(/\\/g, '/');
      console.log("File uploaded successfully:", relativePath);

      res.status(200).json({
        message: "File uploaded successfully",
        filePath: `uploads/${relativePath}`,
        fileInfo: {
          filename: req.file.filename,
          size: req.file.size,
          mimetype: req.file.mimetype
        }
      });
    });
  } catch (error) {
    console.error("Unexpected error during upload:", error);
    res.status(500).json({ message: "An unexpected error occurred during upload" });
  }
});

export default router;
