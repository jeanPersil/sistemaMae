import { IClientsRepository } from "../../interface/IclientsRepository.js";
import supabase from "../supabase/supabase.js";

export class ClientsRepository extends IClientsRepository {
  async create({
    name,
    phone,
    email,
    neighborhood,
    fk_city,
    howDidYouHear,
    birthday,
    notes,
  }) {
    const { data, error } = await supabase
      .from("clientes")
      .insert([
        {
          nome: name,
          telefone: phone,
          email,
          bairro: neighborhood,
          cidade_id: fk_city,
          como_conheceu: howDidYouHear,
          aniversario: birthday,
          observacoes: notes,
        },
      ])
      .select()
      .single();

    if (error) {
      throw new Error(`Erro ao cadastrar cliente no banco: ${error.message}`);
    }

    const dadosMapeados = this.mapToEntityFormat(data);
    return dadosMapeados;
  }

  async findById(id) {
    console.log("FOI ISSO QUE CHEGOU AQUI NESSA POHA: " + id);

    const { data, error } = await supabase
      .from("clientes")
      .select("*")
      .eq("id", id)
      .single();

    if (error) {
      if (error.code === "PGRST116") return null;
      throw new Error(`Erro ao buscar cliente: ${error.message}`);
    }

    const dadosMapeados = this.mapToEntityFormat(data);
    return dadosMapeados;
  }

  async update({ id, name, phone, email, neighborhood, fk_city, notes }) {
    const { data, error } = await supabase
      .from("clientes")
      .update({
        nome: name,
        telefone: phone,
        email,
        bairro: neighborhood,
        cidade_id: fk_city,
        observacoes: notes,
        atualizado_em: new Date().toISOString(),
      })
      .eq("id", id)
      .select()
      .single();

    if (error) {
      throw new Error(`Erro ao atualizar cliente: ${error.message}`);
    }

    const dadosMapeados = this.mapToEntityFormat(data);
    return dadosMapeados;
  }

  async findAll({ page = 1, limit = 10 }) {
    const from = (page - 1) * limit;
    const to = from + limit - 1;

    const { data, error, count } = await supabase
      .from("clientes")
      .select("*", { count: "exact" })
      .range(from, to)
      .order("criado_em", { ascending: false });

    if (error) {
      throw new Error(`Erro ao buscar clientes: ${error.message}`);
    }

    const dadosMapeados = data.map((cliente) =>
      this.mapToEntityFormat(cliente),
    );

    return {
      clients: dadosMapeados,
      meta: {
        totalItems: count,
        currentPage: Number(page),
        itemsPerPage: Number(limit),
        totalPages: Math.ceil(count / limit),
      },
    };
  }

  async delete(id) {
    const { data, error } = await supabase
      .from("clientes")
      .delete()
      .eq("id", id)
      .select()
      .single();

    if (error) {
      if (error.code === "PGRST116") {
        throw new Error("Cliente não encontrado para exclusão.");
      }
      throw new Error(`Erro ao apagar cliente: ${error.message}`);
    }

    return this.mapToEntityFormat(data);
  }

  // ==========================================
  // FUNÇÃO AUXILIAR DE MAPEAMENTO
  // ==========================================

  // ERREI FUI MLK, CRIEI O BANCO EM PT-BR

  mapToEntityFormat(dadosDoBanco) {
    if (!dadosDoBanco) return null;

    return {
      id: dadosDoBanco.id,
      name: dadosDoBanco.nome,
      phone: dadosDoBanco.telefone,
      email: dadosDoBanco.email,
      neighborhood: dadosDoBanco.bairro,
      fk_city: dadosDoBanco.cidade_id,
      howDidYouHear: dadosDoBanco.como_conheceu,
      birthday: dadosDoBanco.aniversario,
      notes: dadosDoBanco.observacoes,
      criado_em: dadosDoBanco.criado_em,
      atualizado_em: dadosDoBanco.atualizado_em,
    };
  }
}
