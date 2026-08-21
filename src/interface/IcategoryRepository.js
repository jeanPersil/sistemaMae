export class ICategoryRepository {
  async create(data) {
    throw new Error("Método de criar usuário ainda não implementado");
  }

  async findAll() {
    throw new Error("Método de puxar todos os clientes ainda não implementado");
  }

  async findById(id) {
    throw new Error("Método de puxar usuário pelo id ainda não implementado");
  }

  async update(id, data) {
    throw new Error("Método de edição de cliente ainda não habilitado"); // Corrigido 'Error'
  }

  async delete(id) {
    throw new Error("Método de apagar cliente ainda não definido");
  }
}
