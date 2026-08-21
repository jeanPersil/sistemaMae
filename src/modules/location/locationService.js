import { LocationRepository } from "../../banco/repository/locationRepository.js";

const locationRepository = new LocationRepository();

export class LocationService {
  async getStates() {
    return locationRepository.findStates();
  }

  async getCitiesByState(stateId) {
    return locationRepository.findCitiesByState(stateId);
  }
}
