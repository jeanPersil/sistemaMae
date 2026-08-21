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

  async getAllClients({ page, limit, search }) {
    const { clients, meta } = await clientsRep.findAll({ page, limit, search });

    const dataClients = clients.map((item) => {
      const client = new ClientEntity(item);
      return client.dadosPublicos();
    });

    return { data: clients, meta };
  }

  async updateClient({ updateClientDto, id }) {
    const client = new ClientEntity(await clientsRep.findById(id));

    client.atualizarDados(updateClientDto);

    const data = await clientsRep.update(client);

    return client.dadosPublicos();
  }

  async getClientById({ id }) {
    const data = await clientsRep.findById(id);
    const client = new ClientEntity(data);
    return client.dadosPublicos();
  }

  async deleteClient({ id }) {
    const data = await clientsRep.delete(id);

    console.log("Cliente apagado: " + data);
    const user = new ClientEntity(data);
    return user;
  }
}
