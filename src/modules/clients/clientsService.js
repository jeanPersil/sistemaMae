import { ClientsRepository } from "../../banco/repository/clientsRepository.js";
import { ClientEntity } from "./entity/clientEntity.js";

const clientsRep = new ClientsRepository();

export class ClientService {
  /*
  constructor(ClientsRepositoy) {
    this.clientsRep = ClientsRepositoy
  }
  */

  async createClient({ createClienteDTO }) {
    const newClient = await clientsRep.create({
      ...createClienteDTO,
    });

    const client = new ClientEntity(newClient);

    return client.dadosPublicos();
  }

  async getAllClients({ page, limit }) {
    const data = await clientsRep.findAll({ page, limit });

    const clientsPublicData = data.map((item) => {
      const client = new ClientEntity(item);
      return client.dadosPublicos();
    });

    console.log(clientsPublicData);

    return clientsPublicData;
  }
}
