import { UI } from "/js/assets/ui-components.js";
import {
  initNewClientModal,
  renderNewClientModal,
} from "/js/clients/newClient.js";

import {
  initEditClientModal,
  renderEditClientModal,
} from "/js/clients/editClient.js";

const state = {
  page: 1,
  limit: 10,
  search: "",
  status: "",
  totalPages: 2,
  totalItems: 0,
};

const container = document.getElementById("clients-view-container");
const inputSearch = document.getElementById("input-search");
const filterStatus = document.getElementById("filter-status");
const btnFilter = document.getElementById("btn-filter");

window.fetchClients = fetchClients;
window.changePage = (newPage) => {
  if (newPage >= 1 && newPage <= state.totalPages) {
    state.page = newPage;
    fetchClients();
  }
};

window.handleEdit = (id) => {
  if (typeof window.openEditClientModal === "function") {
    window.openEditClientModal(id);
  }
};

window.handleDelete = async (id) => {
  if (confirm("Tem certeza que deseja remover este cliente?")) {
    try {
      const response = await fetch(`/client/${id}`, {
        method: "DELETE",
        credentials: "include",
      });

      if (!response.ok) throw new Error("Erro ao excluir cliente.");

      fetchClients();
    } catch (error) {
      alert(error.message);
    }
  }
};

function setupModal() {
  // Inicialização do Modal de Criação
  document.body.insertAdjacentHTML("beforeend", renderNewClientModal());
  initNewClientModal(() => {
    fetchClients();
  });

  // Inicialização do Modal de Edição
  document.body.insertAdjacentHTML("beforeend", renderEditClientModal());
  initEditClientModal(() => {
    fetchClients();
  });
}

async function fetchClients() {
  container.innerHTML = UI.loading("Buscando clientes no servidor...");

  try {
    const params = new URLSearchParams({
      page: state.page,
      limit: state.limit,
      ...(state.search && { search: state.search }),
    });

    const response = await fetch(`/client/?${params.toString()}`, {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`Erro na requisição (Status: ${response.status})`);
    }

    const result = await response.json();
    state.totalItems = result.meta.totalItems || 0;
    state.totalPages = result.meta.totalPages || 1;

    if (!result.data || result.data.length === 0) {
      container.innerHTML = UI.empty("Nenhum cliente cadastrado no momento.");
      return;
    }

    container.innerHTML =
      renderTable(result.data) + UI.pagination(state, "changePage");
  } catch (error) {
    container.innerHTML = UI.error(error.message, "fetchClients");
  }
}

function renderTable(clients) {
  const rows = clients
    .map((client) => {
      const isAtivo = (client.status || "").toLowerCase() === "ativo";
      const statusBadge = isAtivo
        ? "bg-success-subtle text-success"
        : "bg-secondary-subtle text-secondary";

      return `
        <tr>
          <td class="fw-semibold">${client.nome || client.name || "-"}</td>
          <td class="text-muted">${client.telefone || client.phone || "-"}</td>
          <td class="text-muted">${client.email || "-"}</td>
          <td class="text-end">
            <button class="btn btn-sm btn-light border me-1" title="Editar" onclick="handleEdit(${client.id})">
              <i class="bi bi-pencil"></i>
            </button>
            <button class="btn btn-sm btn-light border text-danger" title="Excluir" onclick="handleDelete(${client.id})">
              <i class="bi bi-trash"></i>
            </button>
          </td>
        </tr>
      `;
    })
    .join("");

  return `
    <div class="table-responsive">
      <table class="table align-middle table-hover mb-0">
        <thead class="table-light">
          <tr>
            <th>Nome</th>
            <th>Telefone</th>
            <th>E-mail</th>
            <th class="text-end">Ações</th>
          </tr>
        </thead>
        <tbody>
          ${rows}
        </tbody>
      </table>
    </div>
  `;
}

if (btnFilter) {
  btnFilter.addEventListener("click", () => {
    state.search = inputSearch ? inputSearch.value.trim() : "";
    state.status = filterStatus ? filterStatus.value : "";
    state.page = 1;
    fetchClients();
  });
}

if (inputSearch) {
  inputSearch.addEventListener("keyup", (e) => {
    if (e.key === "Enter") {
      state.search = inputSearch.value.trim();
      state.status = filterStatus ? filterStatus.value : "";
      state.page = 1;
      fetchClients();
    }
  });
}

if (filterStatus) {
  filterStatus.addEventListener("change", () => {
    state.status = filterStatus.value;
    state.page = 1;
    fetchClients();
  });
}

document.addEventListener("DOMContentLoaded", () => {
  setupModal();
  fetchClients();
});
