import express from "express";
import projectController from "./../controllers/project.controller.js";
import tokenMiddleware from "./../middlewares/token.middleware.js";
import { upload } from "../middlewares/upload.middleware.js";

const router = express.Router();

router.get(
  "/get-all",
  // tokenMiddleware.verifyToken,
  projectController.getAllProjects
);

router.get(
  "/get/:id",
  // tokenMiddleware.verifyToken,
  projectController.getProjectById
);

router.post(
  "/add",
  tokenMiddleware.verifyToken,
  upload.fields([{ name: "topImages", maxCount: 5 }, { name: "bottomImages" }]),
  projectController.addProject
);

router.put(
  "/update/:id",
  tokenMiddleware.verifyToken,
  upload.fields([{ name: "topImages", maxCount: 5 }, { name: "bottomImages" }]),
  projectController.updateProjectById
);

router.delete(
  "/delete/:id",
  tokenMiddleware.verifyToken,
  projectController.deleteProject
);

export default router;
