import { Api } from "./api.js";
const api = new Api();
export class Auth {
  constructor() {}

  //logica
  async login(username, password) {
    if (!username || !password) {
      return { success: false, message: "Todos los campos son obligatorios" };
    }
    if (username.length < 3) {
      return { success: false, message: "Nombre del usuario demasiado corto" };
    }
    if (password.length < 6) {
      return { success: false, message: "Contraseña demasiado corta" };
    }
    if (!/^[a-zA-Z0-9_]+$/.test(username)) {
      return {
        success: false,
        message: "El nombre de usuario solo puede contener letras, números y guiones bajos",
      };
    }
    try {
      const response = await api.userLogin(username, password);
      return { success: true, data: response };
    } catch (error) {
      return { success: false, message: "Error al iniciar sesion" };
    }
  }

  async register(username, password) {
    if (!username || !password) {
      return { success: false, message: "Todos los campos son obligatorios" };
    }
    if (username.length < 3) {
      return { success: false, message: "Nombre del usuario demasiado corto" };
    }
    if (password.length < 6) {
      return { success: false, message: "Contraseña demasiado corta" };
    }
    if (!/^[a-zA-Z0-9_]+$/.test(username)) {
      return {
        success: false,
        message: "El nombre de usuario solo puede contener letras, números y guiones bajos",
      };
    }
    try {
      console.log(username + password);
      const response = await api.userRegister(username, password);
      return { success: true, data: response };
    } catch (error) {
      return { success: false, message: "Error al registrar el usuario" };
    }
  }

  //diseño
  paintLogin() {
    let loginContainer = document.getElementById("login-container");
    loginContainer.innerHTML = "";
    loginContainer.innerHTML = `
    <h2>Iniciar sesión</h2>
    <form id="login-form">
      <input type="text" id="username" placeholder="Usuario" required />
      <input type="password" id="password" placeholder="Contraseña" required />
      <p class="form-error" id="form-error"></p>
      <button id="btn-login" type="submit">Entrar</button>
      </br>
      <a href="#" id="register-link">¿No tienes cuenta? Regístrate</a>
    </form>
  `;
    const form = document.getElementById("login-form");
    form.addEventListener("submit", async (event) => {
      event.preventDefault();
      const username = document.getElementById("username").value;
      const password = document.getElementById("password").value;
      let result = await this.login(username, password);
      if (result.success === false && result.message) {
        let errorMessage = document.getElementById("form-error");
        errorMessage.textContent = result.message;
      } else {
        let errorMessage = document.getElementById("form-error");
        errorMessage.textContent = "";
        localStorage.setItem("User", JSON.stringify(result.data));
        window.location.href = "index.html";
      }
    });
    const registerLink = document.getElementById("register-link");
    registerLink.addEventListener("click", (event) => {
      event.preventDefault();
      this.paintRegister();
    });
  }

  paintRegister() {
    const loginContainer = document.getElementById("login-container");
    loginContainer.innerHTML = `
    <h2>Regístrate</h2>
    <form id="register-form">
      <input type="text" id="username" placeholder="Usuario" required />
      <input type="password" id="password" placeholder="Contraseña" required />
      <p class="form-error" id="form-error"></p>
      <button id="btn-register" type="submit">Registrarse</button>
      </br>
      <a href="#" id="login-link">¿Ya tienes cuenta? Iniciar sesión</a>
    </form>
  `;
    const form = document.getElementById("register-form");
    form.addEventListener("submit", async (event) => {
      event.preventDefault();
      const username = document.getElementById("username").value;
      const password = document.getElementById("password").value;
      let result = await this.register(username, password);
      if (result.success === false && result.message) {
        let errorMessage = document.getElementById("form-error");
        errorMessage.textContent = result.message;
      } else {
        let errorMessage = document.getElementById("form-error");
        errorMessage.textContent = "";
        localStorage.setItem("User", JSON.stringify(result.data));
        window.location.href = "index.html";
      }
    });
    const loginLink = document.getElementById("login-link");
    loginLink.addEventListener("click", (event) => {
      event.preventDefault();
      this.paintLogin();
    });
  }
}
