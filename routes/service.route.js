import express from "express";
import serviceController from "./../controllers/service.controller.js";
import tokenMiddleware from "./../middlewares/token.middleware.js";
import { upload } from "../middlewares/upload.middleware.js";

const router = express.Router();

router.get(
  "/get-all",
  serviceController.getAllServices
);

router.post(
  "/add",
  tokenMiddleware.verifyToken,
  upload.fields([{ name: "logo", maxCount: 1 }, { name: "image" , maxCount: 1 }]),
  serviceController.addService
);

router.put(
  "/update/:id",
  tokenMiddleware.verifyToken,
  upload.fields([{ name: "logo", maxCount: 1 }, { name: "image" , maxCount: 1 }]),
  serviceController.updateServiceById
);

router.delete(
  "/delete/:id",
  tokenMiddleware.verifyToken,
  serviceController.deleteService
);

export default router;
