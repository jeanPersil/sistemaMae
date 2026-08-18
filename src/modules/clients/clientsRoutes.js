import Router from "express";
import { ClientController } from "./clientsController.js";
import { validateBody } from "../../middleware/validateDTO.js";
import { createClienteSchema } from "./dtos/createClient.dto.js";

const clientController = new ClientController();

const cliRouter = Router();

cliRouter.post("/", clientController.create);
cliRouter.put("/:userId", clientController.update);
cliRouter.get("/", clientController.findAll);
cliRouter.get("/:userId", clientController.findById);
cliRouter.delete("/:userId", clientController.delete);

export default cliRouter;
