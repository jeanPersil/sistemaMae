import { ICategoryRepository } from "../../interface/IcategoryRepository.js";
import supabase from "../supabase/supabase.js";

export class CategoryRepository extends ICategoryRepository {
  async create({ name }) {
    const { data, error } = await supabase
      .from("categoria")
      .insert([{ nome: name }])
      .select()
      .single();

    if (error) {
      throw new Error(`Erro ao cadastrar categoria: ${error.message}`);
    }

    return this.mapToEntityFormat(data);
  }

  async findById({ id }) {
    const { data, error } = await supabase
      .from("categoria")
      .select("*")
      .eq("id", id)
      .single();

    if (error) {
      if (error.code === "PGRST116") return null;
      throw new Error(`Erro ao buscar categoria: ${error.message}`);
    }

    return this.mapToEntityFormat(data);
  }

  async findAll() {
    const { data, error } = await supabase
      .from("categoria")
      .select("*")
      .order("nome", { ascending: true });

    if (error) {
      throw new Error(`Erro ao buscar categorias: ${error.message}`);
    }

    return data.map((categoria) => this.mapToEntityFormat(categoria));
  }

  async update({ id, name }) {
    const { data, error } = await supabase
      .from("categoria")
      .update({ nome: name })
      .eq("id", id)
      .select()
      .single();

    if (error) {
      if (error.code === "PGRST116") {
        throw new Error("Categoria não encontrada para atualização.");
      }
      throw new Error(`Erro ao atualizar categoria: ${error.message}`);
    }

    return this.mapToEntityFormat(data);
  }

  async delete({ id }) {
    const { data, error } = await supabase
      .from("categoria")
      .delete()
      .eq("id", id)
      .select()
      .single();

    if (error) {
      if (error.code === "PGRST116") {
        throw new Error("Categoria não encontrada para exclusão.");
      }
      throw new Error(`Erro ao apagar categoria: ${error.message}`);
    }

    return this.mapToEntityFormat(data);
  }

  //CRIEI O BANCO EM PT BR FUI MLK

  mapToEntityFormat(category) {
    if (!category) return null;

    return {
      id: category.id,
      name: category.nome,
    };
  }
}
