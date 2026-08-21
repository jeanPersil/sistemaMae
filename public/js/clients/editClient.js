import { UI } from "../assets/ui-components.js";


// 1. Template do Modal de Edição
export function renderEditClientModal() {
  return `
    <div class="modal fade" id="modalEditCliente" tabindex="-1" aria-labelledby="modalEditClienteLabel" aria-hidden="true">
      <div class="modal-dialog modal-lg modal-dialog-centered">
        <div class="modal-content border-0 shadow">
          
          <div class="modal-header border-bottom-0 pb-0">
            <h5 class="modal-title fw-bold" id="modalEditClienteLabel">Editar Cliente</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Fechar"></button>
          </div>

          <form id="form-edit-cliente">
            <input type="hidden" id="edit-client-id">

            <div class="modal-body py-4">
              <div id="modal-edit-alert-container"></div>

              <div id="modal-edit-loading" class="text-center py-4 d-none">
                <div class="spinner-border text-danger" role="status"></div>
                <p class="mt-2 text-muted small">Carregando dados do cliente...</p>
              </div>

              <div id="modal-edit-fields" class="row g-3">
                <!-- Nome -->
                <div class="col-12 col-md-6">
                  <label for="edit-client-name" class="form-label small fw-semibold">Nome Completo <span class="text-danger">*</span></label>
                  <input type="text" class="form-control" id="edit-client-name" required>
                </div>

                <!-- Telefone -->
                <div class="col-12 col-md-6">
                  <label for="edit-client-phone" class="form-label small fw-semibold">Telefone / WhatsApp</label>
                  <input type="tel" class="form-control" id="edit-client-phone">
                </div>

                <!-- E-mail -->
                <div class="col-12 col-md-6">
                  <label for="edit-client-email" class="form-label small fw-semibold">E-mail</label>
                  <input type="email" class="form-control" id="edit-client-email">
                </div>

                <!-- Data de Aniversário -->
                <div class="col-12 col-md-6">
                  <label for="edit-client-birthday" class="form-label small fw-semibold">Data de Aniversário</label>
                  <input type="date" class="form-control" id="edit-client-birthday">
                </div>

                <!-- Bairro -->
                <div class="col-12 col-md-6">
                  <label for="edit-client-neighborhood" class="form-label small fw-semibold">Bairro</label>
                  <input type="text" class="form-control" id="edit-client-neighborhood">
                </div>

                <!-- Estado (UF) -->
                <div class="col-12 col-md-3">
                  <label for="edit-client-state" class="form-label small fw-semibold">Estado</label>
                  <select class="form-select" id="edit-client-state">
                    <option value="">Selecione o estado...</option>
                  </select>
                </div>

                <!-- Cidade -->
                <div class="col-12 col-md-3">
                  <label for="edit-client-city" class="form-label small fw-semibold">Cidade</label>
                  <select class="form-select" id="edit-client-city" disabled>
                    <option value="">Selecione um estado primeiro...</option>
                  </select>
                </div>

                <!-- Como Conheceu -->
                <div class="col-12 col-md-6">
                  <label for="edit-client-how-hear" class="form-label small fw-semibold">Como conheceu?</label>
                  <select class="form-select" id="edit-client-how-hear">
                    <option value="">Selecione uma opção...</option>
                    <option value="Instagram">Instagram</option>
                    <option value="Indicação">Indicação</option>
                    <option value="Google">Google / Pesquisa</option>
                    <option value="Fachada">Passou em frente</option>
                    <option value="Outro">Outro</option>
                  </select>
                </div>

                <!-- Status -->
                <div class="col-12 col-md-6">
                  <label for="edit-client-status" class="form-label small fw-semibold">Status</label>
                  <select class="form-select" id="edit-client-status">
                    <option value="Ativo">Ativo</option>
                    <option value="Inativo">Inativo</option>
                  </select>
                </div>

                <!-- Observações -->
                <div class="col-12">
                  <label for="edit-client-notes" class="form-label small fw-semibold">Observações</label>
                  <textarea class="form-control" id="edit-client-notes" rows="3"></textarea>
                </div>
              </div>
            </div>

            <div class="modal-footer border-top-0 pt-0">
              <button type="button" class="btn btn-light border" data-bs-dismiss="modal">Cancelar</button>
              <button type="submit" id="btn-update-client" class="btn btn-coral px-4">
                Atualizar Cliente
              </button>
            </div>
          </form>

        </div>
      </div>
    </div>
  `;
}

export function initEditClientModal(onSuccessCallback) {
  const form = document.getElementById("form-edit-cliente");
  const modalEl = document.getElementById("modalEditCliente");
  const alertBox = document.getElementById("modal-edit-alert-container");
  const btnUpdate = document.getElementById("btn-update-client");

  const selectState = document.getElementById("edit-client-state");
  const selectCity = document.getElementById("edit-client-city");

  if (!form || !modalEl) return;

  const getModalInstance = () => bootstrap.Modal.getOrCreateInstance(modalEl);

  selectState.addEventListener("change", () => {
    const stateId = selectState.value;
    if (!stateId) {
      selectCity.innerHTML =
        '<option value="">Selecione um estado primeiro...</option>';
      selectCity.disabled = true;
      return;
    }
    loadCitiesByState(stateId);
  });

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    alertBox.innerHTML = "";

    const id = document.getElementById("edit-client-id").value;
    const payload = {
      name: document.getElementById("edit-client-name").value.trim(),
      phone: document.getElementById("edit-client-phone").value.trim() || null,
      email: document.getElementById("edit-client-email").value.trim() || null,
      birthday: document.getElementById("edit-client-birthday").value || null,
      neighborhood:
        document.getElementById("edit-client-neighborhood").value.trim() ||
        null,
      fk_city: selectCity.value ? Number(selectCity.value) : null,
      howDidYouHear:
        document.getElementById("edit-client-how-hear").value || null,
      status: document.getElementById("edit-client-status").value,
      notes: document.getElementById("edit-client-notes").value.trim() || null,
    };

    const originalBtnText = btnUpdate.innerHTML;
    btnUpdate.disabled = true;
    btnUpdate.innerHTML = `<span class="spinner-border spinner-border-sm me-2" role="status"></span>Atualizando...`;

    try {
      const response = await fetch(`/client/${id}`, {
        method: "PUT",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const result = await response.json();
      if (!response.ok)
        throw new Error(result.message || "Erro ao atualizar cliente.");

      getModalInstance().hide();

      if (typeof onSuccessCallback === "function") {
        onSuccessCallback();
      }
    } catch (error) {
      alertBox.innerHTML = UI.alert(error.message, "danger");
    } finally {
      btnUpdate.disabled = false;
      btnUpdate.innerHTML = originalBtnText;
    }
  });

  modalEl.addEventListener("hidden.bs.modal", () => {
    form.reset();
    selectCity.innerHTML =
      '<option value="">Selecione um estado primeiro...</option>';
    selectCity.disabled = true;
    alertBox.innerHTML = "";
  });

  async function loadStates(selectedStateId = null) {
    try {
      const response = await fetch("/api/states", { credentials: "include" });
      if (!response.ok) return;
      const states = await response.json();

      selectState.innerHTML =
        '<option value="">Selecione o estado...</option>' +
        states
          .map(
            (uf) =>
              `<option value="${uf.id}" ${selectedStateId == uf.id ? "selected" : ""}>${uf.nome || uf.name} (${uf.sigla || uf.uf})</option>`,
          )
          .join("");
    } catch (error) {
      console.error("Erro ao carregar estados:", error);
    }
  }

  async function loadCitiesByState(stateId, selectedCityId = null) {
    selectCity.disabled = true;
    selectCity.innerHTML = '<option value="">Carregando cidades...</option>';

    try {
      const response = await fetch(`/api/cities?state_id=${stateId}`, {
        credentials: "include",
      });
      if (!response.ok) throw new Error();
      const cities = await response.json();

      selectCity.innerHTML =
        '<option value="">Selecione a cidade...</option>' +
        cities
          .map(
            (city) =>
              `<option value="${city.id}" ${selectedCityId == city.id ? "selected" : ""}>${city.nome || city.name}</option>`,
          )
          .join("");
      selectCity.disabled = false;
    } catch (error) {
      selectCity.innerHTML =
        '<option value="">Erro ao carregar cidades</option>';
    }
  }

  window.openEditClientModal = async (clientId) => {
    const loadingEl = document.getElementById("modal-edit-loading");
    const fieldsEl = document.getElementById("modal-edit-fields");

    getModalInstance().show();
    alertBox.innerHTML = "";
    fieldsEl.classList.add("d-none");
    loadingEl.classList.remove("d-none");

    try {
      const response = await fetch(`/client/${clientId}`, {
        credentials: "include",
      });
      if (!response.ok) throw new Error("Erro ao buscar dados do cliente.");

      const client = await response.json();

      document.getElementById("edit-client-id").value = client.id;
      document.getElementById("edit-client-name").value =
        client.nome || client.name || "";
      document.getElementById("edit-client-phone").value =
        client.telefone || client.phone || "";
      document.getElementById("edit-client-email").value = client.email || "";
      document.getElementById("edit-client-birthday").value =
        client.aniversario || client.birthday || "";
      document.getElementById("edit-client-neighborhood").value =
        client.bairro || client.neighborhood || "";
      document.getElementById("edit-client-how-hear").value =
        client.como_conheceu || client.howDidYouHear || "";
      document.getElementById("edit-client-status").value =
        client.status || "Ativo";
      document.getElementById("edit-client-notes").value =
        client.observacoes || client.notes || "";

      const stateId = client.estado_id || client.state_id || null;
      const cityId = client.cidade_id || client.fk_city || null;

      await loadStates(stateId);
      if (stateId) {
        await loadCitiesByState(stateId, cityId);
      }

      loadingEl.classList.add("d-none");
      fieldsEl.classList.remove("d-none");
    } catch (error) {
      loadingEl.classList.add("d-none");
      alertBox.innerHTML = UI.alert(error.message, "danger");
    }
  };
}
