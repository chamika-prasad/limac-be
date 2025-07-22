import express from "express";
import homeController from "./../controllers/home.controller.js";
import tokenMiddleware from "./../middlewares/token.middleware.js";
import { upload } from "../middlewares/upload.middleware.js";

const router = express.Router();

router.get("/get-all", homeController.getAllImages);

router.post(
  "/add",
  tokenMiddleware.verifyToken,
  upload.fields([{ name: "image", maxCount: 1 }]),
  homeController.addImage
);

router.delete(
  "/delete/:id",
  tokenMiddleware.verifyToken,
  homeController.deleteImage
);

export default router;
