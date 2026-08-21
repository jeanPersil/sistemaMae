import { Router } from "express";
import { LocationController } from "./locationController.js";

const locationController = new LocationController();
const locationRouter = Router();

locationRouter.get("/states", locationController.getStates);
locationRouter.get("/cities", locationController.getCitiesByState);

export default locationRouter;
