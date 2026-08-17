import { ClientService } from "./clientsService.js";

const clientService = new ClientService();

export class ClientController {
  create = async (req, res) => {
    const createClienteDTO = req.body;

    const data = await clientService.createClient({
      createClienteDTO: createClienteDTO,
    });

    return res.status(201).send(data);
  };

  findAll = async (req, res) => {
    try {
      const page = parseInt(req.query.page);
      const limit = parseInt(req.query.limit);

      const data = await clientService.getAllClients({ page, limit });

      return res.status(200).json(data);
    } catch (error) {}
  };
}
