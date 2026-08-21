import { IuserRepository } from "../../interface/IuserRepository.js";
import supabase from "../supabase/supabase.js";

export class UserRepository extends IuserRepository {
  async SignUp({ name, email, password, role = "admin" }) {
    const { data, error } = await supabase
      .from("usuarios")
      .insert([
        {
          nome: name,
          email,
          senha: password,
          role,
        },
      ])
      .select()
      .single();

    if (error) {
      if (error.code === "23505") {
        throw new Error("Este e-mail já está em uso.");
      }
      throw new Error(`Erro ao cadastrar usuário no banco: ${error.message}`);
    }

    return data;
  }

  async login(email) {
    const { data, error } = await supabase
      .from("usuarios")
      .select("*")
      .eq("email", email)
      .single();

    if (error) {
      if (error.code === "PGRST116") {
        return null;
      }
      throw new Error(`Erro ao buscar usuário: ${error.message}`);
    }

    return data;
  }
}
