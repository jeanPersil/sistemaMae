import { UI } from "../assets/ui-components.js";

export function renderNewClientModal() {
  return `
    <div class="modal fade" id="modalCliente" tabindex="-1" aria-labelledby="modalClienteLabel" aria-hidden="true">
      <div class="modal-dialog modal-lg modal-dialog-centered">
        <div class="modal-content border-0 shadow">
          
          <div class="modal-header border-bottom-0 pb-0">
            <h5 class="modal-title fw-bold" id="modalClienteLabel">Novo Cliente</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Fechar"></button>
          </div>

          <form id="form-cliente">
            <div class="modal-body py-4">
              <div id="modal-alert-container"></div>

              <div class="row g-3">
                <!-- Nome (Único obrigatório) -->
                <div class="col-12 col-md-6">
                  <label for="client-name" class="form-label small fw-semibold">Nome Completo <span class="text-danger">*</span></label>
                  <input type="text" class="form-control" id="client-name" required placeholder="Ex: Maria Silva">
                </div>

                <!-- Telefone / WhatsApp (Opcional) -->
                <div class="col-12 col-md-6">
                  <label for="client-phone" class="form-label small fw-semibold">Telefone / WhatsApp</label>
                  <input type="tel" class="form-control" id="client-phone" placeholder="(75) 99999-9999">
                </div>

                <!-- E-mail -->
                <div class="col-12 col-md-6">
                  <label for="client-email" class="form-label small fw-semibold">E-mail</label>
                  <input type="email" class="form-control" id="client-email" placeholder="cliente@email.com">
                </div>

                <!-- Data de Aniversário -->
                <div class="col-12 col-md-6">
                  <label for="client-birthday" class="form-label small fw-semibold">Data de Aniversário</label>
                  <input type="date" class="form-control" id="client-birthday">
                </div>

                <!-- Bairro -->
                <div class="col-12 col-md-6">
                  <label for="client-neighborhood" class="form-label small fw-semibold">Bairro</label>
                  <input type="text" class="form-control" id="client-neighborhood" placeholder="Ex: Centro">
                </div>

                <!-- Estado (UF) -->
                <div class="col-12 col-md-3">
                  <label for="client-state" class="form-label small fw-semibold">Estado</label>
                  <select class="form-select" id="client-state">
                    <option value="">Selecione o estado...</option>
                  </select>
                </div>

                <!-- Cidade -->
                <div class="col-12 col-md-3">
                  <label for="client-city" class="form-label small fw-semibold">Cidade</label>
                  <select class="form-select" id="client-city" disabled>
                    <option value="">Selecione um estado primeiro...</option>
                  </select>
                </div>

                <!-- Como Conheceu -->
                <div class="col-12">
                  <label for="client-how-hear" class="form-label small fw-semibold">Como conheceu?</label>
                  <select class="form-select" id="client-how-hear">
                    <option value="">Selecione uma opção...</option>
                    <option value="Instagram">Instagram</option>
                    <option value="Indicação">Indicação</option>
                    <option value="Google">Google / Pesquisa</option>
                    <option value="Fachada">Passou em frente</option>
                    <option value="Outro">Outro</option>
                  </select>
                </div>

                <!-- Observações -->
                <div class="col-12">
                  <label for="client-notes" class="form-label small fw-semibold">Observações</label>
                  <textarea class="form-control" id="client-notes" rows="3" placeholder="Preferências, restrições ou observações gerais..."></textarea>
                </div>
              </div>
            </div>

            <div class="modal-footer border-top-0 pt-0">
              <button type="button" class="btn btn-light border" data-bs-dismiss="modal">Cancelar</button>
              <button type="submit" id="btn-save-client" class="btn btn-coral px-4">
                Salvar Cliente
              </button>
            </div>
          </form>

        </div>
      </div>
    </div>
  `;
}

export function initNewClientModal(onSuccessCallback) {
  const form = document.getElementById("form-cliente");
  const modalEl = document.getElementById("modalCliente");
  const alertBox = document.getElementById("modal-alert-container");
  const btnSave = document.getElementById("btn-save-client");

  const selectState = document.getElementById("client-state");
  const selectCity = document.getElementById("client-city");

  if (!form || !modalEl) return;

  const getModalInstance = () => bootstrap.Modal.getOrCreateInstance(modalEl);

  loadStates();

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

    const payload = {
      name: document.getElementById("client-name").value.trim(),
      phone: document.getElementById("client-phone").value.trim() || null,
      email: document.getElementById("client-email").value.trim() || null,
      birthday: document.getElementById("client-birthday").value || null,
      neighborhood:
        document.getElementById("client-neighborhood").value.trim() || null,
      fk_city: selectCity.value ? Number(selectCity.value) : null,
      howDidYouHear: document.getElementById("client-how-hear").value || null,
      notes: document.getElementById("client-notes").value.trim() || null,
    };

    const originalBtnText = btnSave.innerHTML;
    btnSave.disabled = true;
    btnSave.innerHTML = `<span class="spinner-border spinner-border-sm me-2" role="status"></span>Salvando...`;

    try {
      const response = await fetch("/client/", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const result = await response.json();
      if (!response.ok)
        throw new Error(result.message || "Erro ao cadastrar cliente.");

      form.reset();
      selectCity.innerHTML =
        '<option value="">Selecione um estado primeiro...</option>';
      selectCity.disabled = true;

      getModalInstance().hide();

      if (typeof onSuccessCallback === "function") {
        onSuccessCallback();
      }
    } catch (error) {
      alertBox.innerHTML = UI.alert(error.message, "danger");
    } finally {
      btnSave.disabled = false;
      btnSave.innerHTML = originalBtnText;
    }
  });

  modalEl.addEventListener("hidden.bs.modal", () => {
    form.reset();
    selectCity.innerHTML =
      '<option value="">Selecione um estado primeiro...</option>';
    selectCity.disabled = true;
    alertBox.innerHTML = "";
  });

  async function loadStates() {
    try {
      const response = await fetch("/api/states", { credentials: "include" });
      if (!response.ok) return;
      const states = await response.json();

      selectState.innerHTML =
        '<option value="">Selecione o estado...</option>' +
        states
          .map(
            (uf) =>
              `<option value="${uf.id}">${uf.nome || uf.name} (${uf.sigla || uf.uf})</option>`,
          )
          .join("");
    } catch (error) {
      console.error("Erro ao carregar estados:", error);
    }
  }

  async function loadCitiesByState(stateId) {
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
              `<option value="${city.id}">${city.nome || city.name}</option>`,
          )
          .join("");
      selectCity.disabled = false;
    } catch (error) {
      selectCity.innerHTML =
        '<option value="">Erro ao carregar cidades</option>';
    }
  }
}
