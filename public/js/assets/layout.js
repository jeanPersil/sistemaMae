document.addEventListener("DOMContentLoaded", async () => {
  // Caminhos ajustados para a raiz pública e nomes em camelCase
  await loadComponent("#sidebar-container", "./components/sideBar.html");
  await loadComponent("#navbar-container", "./components/navBar.html");

  highlightActiveMenu();
  setupMobileToggle();
});

async function loadComponent(selector, fileUrl) {
  try {
    const response = await fetch(fileUrl);
    if (!response.ok) {
      throw new Error(
        `Falha ao carregar ${fileUrl} (Status: ${response.status})`,
      );
    }
    const html = await response.text();
    const container = document.querySelector(selector);
    if (container) {
      container.innerHTML = html;
    }
  } catch (error) {
    console.error("Erro ao carregar componente:", error);
  }
}

function highlightActiveMenu() {
  const currentPage =
    window.location.pathname.split("/").pop().replace(".html", "") || "index"; // Trata caso a rota seja apenas "/"

  const activeLink = document.querySelector(
    `.sidebar-link[data-page="${currentPage}"]`,
  );

  if (activeLink) {
    activeLink.classList.add("active");
  }
}

function setupMobileToggle() {
  const toggler = document.getElementById("sidebar-toggler");
  const sidebar = document.getElementById("sidebar-container");
  if (toggler && sidebar) {
    toggler.addEventListener("click", () => {
      sidebar.classList.toggle("show");
    });
  }
}
