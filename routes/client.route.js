import express from "express";
import clientController from "./../controllers/client.controller.js";
import tokenMiddleware from "./../middlewares/token.middleware.js";

const router = express.Router();

router.get(
  "/get-all",
  tokenMiddleware.verifyToken,
  clientController.getAllClients
);

router.get(
  "/get/:id",
  tokenMiddleware.verifyToken,
  clientController.getClientById
);

router.post("/add", tokenMiddleware.verifyToken, clientController.addClient);

router.put(
  "/update/:id",
  tokenMiddleware.verifyToken,
  clientController.updateClientById
);

router.delete(
  "/delete/:id",
  tokenMiddleware.verifyToken,
  clientController.deleteClient
);

export default router;
