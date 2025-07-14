import multer from "multer";
import path from "path";
import fs from "fs";
import { v4 as uuidv4 } from "uuid";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // let projectId = req.params.id || req.body.id;

    const route = req.originalUrl;
    let folderPath = "uploads"; // base folder

    let recordId = req.params.id || req.body.id;
    if (!recordId) {
      recordId = uuidv4();
      req.body.id = recordId; // Set it so controller can access it
    }

    if (route.includes("/projects")) {
      folderPath = path.join("uploads", "projects", recordId);
    } else if (route.includes("/services")) {
      folderPath = path.join("uploads", "services",recordId);
    } else if (route.includes("/clients")) {
      folderPath = path.join("uploads", "clients",recordId);
    }

    fs.mkdirSync(folderPath, { recursive: true });
    cb(null, folderPath);
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname); // Can customize name here if needed
  },
});

export const upload = multer({ storage });
