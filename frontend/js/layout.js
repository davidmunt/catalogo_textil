export class Layout {
  constructor() {
    this.userData = JSON.parse(localStorage.getItem("User"));
  }

  paintHeader() {
    const headerContainer = document.createElement("header");
    headerContainer.classList.add("main-header");

    const logo = document.createElement("div");
    logo.classList.add("logo");
    logo.textContent = "Catalogo Textil";
    logo.onclick = () => {
      window.location.href = "home.html";
    };

    const nav = document.createElement("nav");
    nav.classList.add("nav-links");

    const homeBtn = document.createElement("button");
    homeBtn.textContent = "Home";
    homeBtn.onclick = () => {
      window.location.href = "home.html";
    };

    const cartBtn = document.createElement("button");
    cartBtn.textContent = "Shopping Cart";
    cartBtn.onclick = () => {
      window.location.href = "carrito.html";
    };

    nav.appendChild(homeBtn);
    nav.appendChild(cartBtn);

    const userZone = document.createElement("div");
    userZone.classList.add("user-zone");

    if (!this.userData) {
      const authBtn = document.createElement("button");
      authBtn.textContent = "Auth";
      authBtn.onclick = () => {
        window.location.href = "auth.html";
      };

      userZone.appendChild(authBtn);
    } else {
      const userInfo = document.createElement("div");
      userInfo.classList.add("user-info");

      const userImage = document.createElement("img");
      userImage.src = this.userData.image;
      userImage.alt = "User avatar";
      userImage.classList.add("user-avatar");

      const usernameText = document.createElement("span");
      usernameText.textContent = this.userData.username;

      userInfo.appendChild(userImage);
      userInfo.appendChild(usernameText);
      userZone.appendChild(userInfo);

      const logoutBtn = document.createElement("button");

      userZone.appendChild(logoutBtn);

      logoutBtn.textContent = "Logout";
      logoutBtn.onclick = () => {
        localStorage.removeItem("User");
        this.userData = null;
        window.location.href = "home.html";
        //this.paintHeader();
      };
    }
    headerContainer.appendChild(logo);
    headerContainer.appendChild(nav);
    headerContainer.appendChild(userZone);
    document.body.prepend(headerContainer);
  }

  paintFooter() {
    const footerContainer = document.createElement("footer");
    footerContainer.classList.add("main-footer");
    footerContainer.innerHTML = `
      <p>&copy; ${new Date().getFullYear()} Catálogo Textil. Todos los derechos reservados.</p>
      <p>Desarrollado por David Muntean</p>
    `;
    document.body.appendChild(footerContainer);
  }
}
