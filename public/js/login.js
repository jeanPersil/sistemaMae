import { showError } from "/assets/alert.js";

const formLogin = document.getElementById("formLogin");

formLogin.addEventListener("submit", async (event) => {
  event.preventDefault();

  const formData = new FormData(formLogin);
  const email = formData.get("email");
  const password = formData.get("password");

  if (!email || !password) {
    formLogin.insertAdjacentHTML(
      "beforeend",
      showError({ message: "É necessário preencher email e senha." }),
    );
    return;
  }

  try {
    const response = await fetch("/user/auth/login", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();

    if (!response.ok) {
      formLogin.insertAdjacentHTML(
        "beforeend",
        showError({ message: data.message }),
      );

      return;
    }

    window.location.replace("/cliente");
  } catch (error) {
    formLogin.insertAdjacentHTML(
      "beforeend",
      showError({ message: `to caindo aqui: ${error.message}` }),
    );
  }
});
