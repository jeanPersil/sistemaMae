export const UI = {
  //alert
  alert(message, type = "danger") {
    return `
      <div class="alert alert-${type} alert-dismissible fade show mt-3" role="alert">
        ${message}
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
      </div>
    `;
  },

  // Estado de Carregamento
  loading(message = "Carregando registros...") {
    return `
      <div class="text-center py-5">
        <div class="spinner-border text-danger" role="status"></div>
        <p class="mt-2 text-muted small">${message}</p>
      </div>
    `;
  },

  // Estado Vazio
  empty(message = "Nenhum registro encontrado.", icon = "bi-people") {
    return `
      <div class="text-center py-5">
        <i class="bi ${icon} text-muted display-4"></i>
        <p class="mt-3 text-muted">${message}</p>
      </div>
    `;
  },

  // Estado de Erro
  error(
    message = "Erro ao carregar os dados.",
    retryCallbackName = "fetchClients",
  ) {
    return `
      <div class="text-center py-5">
        <i class="bi bi-exclamation-triangle text-danger display-5"></i>
        <p class="mt-3 text-muted">${message}</p>
        <button class="btn btn-sm btn-outline-secondary" onclick="${retryCallbackName}()">
          <i class="bi bi-arrow-clockwise me-1"></i> Tentar novamente
        </button>
      </div>
    `;
  },

  // Paginação
  pagination(state, changePageFnName = "changePage") {
    if (state.totalPages <= 1) return "";

    let items = `
      <li class="page-item ${state.page === 1 ? "disabled" : ""}">
        <button class="page-link" onclick="${changePageFnName}(${state.page - 1})">Anterior</button>
      </li>
    `;

    for (let i = 1; i <= state.totalPages; i++) {
      const active = state.page === i;
      items += `
        <li class="page-item ${active ? "active" : ""}">
          <button class="page-link ${active ? "bg-danger border-danger" : ""}" onclick="${changePageFnName}(${i})">${i}</button>
        </li>
      `;
    }

    items += `
      <li class="page-item ${state.page === state.totalPages ? "disabled" : ""}">
        <button class="page-link" onclick="${changePageFnName}(${state.page + 1})">Próximo</button>
      </li>
    `;

    return `
      <div class="d-flex justify-content-between align-items-center mt-4">
        <span class="small text-muted">
          Página <b>${state.page}</b> de <b>${state.totalPages}</b> (<b>${state.totalItems}</b> registros)
        </span>
        <ul class="pagination pagination-sm mb-0">
          ${items}
        </ul>
      </div>
    `;
  },
};
