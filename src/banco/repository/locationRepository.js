import supabase from "../supabase/supabase.js";

export class LocationRepository {
  async findStates() {
    const { data, error } = await supabase
      .from("estado")
      .select("id, nome")
      .order("nome", { ascending: true });

    if (error) {
      throw new Error(`Erro ao buscar estados: ${error.message}`);
    }

    return data;
  }

  async findCitiesByState(stateId) {
    const { data, error } = await supabase
      .from("cidade")
      .select("id, nome")
      .eq("estado_id", stateId)
      .order("nome", { ascending: true });

    if (error) {
      throw new Error(`Erro ao buscar cidades: ${error.message}`);
    }

    return data;
  }
}
