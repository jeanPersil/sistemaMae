import Router from "express";
import { ClientController } from "./clientsController.js";
import { validateBody } from "../../middleware/validateDTO.js";
import { createClienteSchema } from "./dtos/createClient.dto.js";

const clientController = new ClientController();

const cliRouter = Router();

cliRouter.post("/", clientController.create);
cliRouter.get("/", clientController.findAll);

export default cliRouter;
