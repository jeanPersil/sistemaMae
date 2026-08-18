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
      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 10;

      const data = await clientService.getAllClients({ page, limit });
      return res.status(201).json(data);
    } catch (error) {}
  };

  findById = async (req, res) => {
    const { userId } = req.params;

    try {
      if (!userId) {
        return res.status(400).json({ erro: "ID do cliente não fornecido" });
      }

      const data = await clientService.getClientById({ id: userId });

      if (!data) {
        return res.status(404).json({ erro: "Cliente não encontrado" });
      }

      return res.status(200).json(data);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ erro: error.message });
    }
  };

  update = async (req, res) => {
    const { userId } = req.params;
    const updateClientDto = req.body;

    if (!userId) {
      throw new Error("Id do cliente não fornecido");
    }

    const data = await clientService.updateClient({
      id: userId,
      updateClientDto,
    });

    return res.status(200).json(data);
  };

  delete = async (req, res) => {
    const { userId } = req.params;

    if (!userId) {
      throw new Error("Usuario não encontrado");
    }

    const data = await clientService.deleteClient({ id: userId });

    return res.status(200).json(data);
  };
}
