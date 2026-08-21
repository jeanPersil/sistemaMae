import { LocationService } from "./locationService.js";

const locationService = new LocationService();

export class LocationController {
  getStates = async (req, res) => {
    try {
      const states = await locationService.getStates();
      return res.status(200).json(states);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: error.message });
    }
  };

  getCitiesByState = async (req, res) => {
    const stateId = Number(req.query.state_id);

    if (!Number.isInteger(stateId) || stateId <= 0) {
      return res.status(400).json({
        message: "O parâmetro state_id deve ser um número inteiro positivo",
      });
    }

    try {
      const cities = await locationService.getCitiesByState(stateId);
      return res.status(200).json(cities);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: error.message });
    }
  };
}
