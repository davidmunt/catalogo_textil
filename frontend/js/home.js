import { Api } from "./api.js";
const api = new Api();
export class Home {
  constructor() {
    this.families = [];
    this.products = [];
    this.productsVistos = [];
    this.productsVistosFinal = [];
    this.userData = JSON.parse(localStorage.getItem("User"));
  }

  async init() {
    try {
      this.families = await this.getFamilies();
      const firstFamilyKey = Object.keys(this.families.data)[0];
      const firstSubfamily = this.families.data[firstFamilyKey].subfamilias[0];
      const refSubfamilia = firstSubfamily.refsubfamilia;
      const productos = await this.getProducts(refSubfamilia);
      this.products = productos.data;
      const prodVistos = await this.getLastSeenProducts();
      this.productsVistos = prodVistos.data.lastSeen || [];
      this.productsVistosFinal = [];
      for (const prod of this.productsVistos) {
        const prodData = await api.productGet(prod.productId);
        if (prodData) this.productsVistosFinal.push(prodData);
      }
    } catch (error) {
      console.error("Error al inicializar Home:", error);
    }
  }

  async getFamilies() {
    try {
      const response = await api.familiesGet();
      return { success: true, data: response };
    } catch (error) {
      return { success: false, message: "Error al recibir familas y subfamilas" };
    }
  }

  async getProducts(subfamilia) {
    try {
      const response = await api.productsGet(subfamilia);
      return { success: true, data: response };
    } catch (error) {
      return { success: false, message: "Error al recibir productos" };
    }
  }

  async getLastSeenProducts() {
    try {
      const response = await api.getLastSeenByUser(this.userData.user_id);
      return { success: true, data: response };
    } catch (error) {
      return { success: false, message: "Error al recibir productos vistos recientemente" };
    }
  }

  paintFilter() {
    const familias = this.families.data;
    const loginContainer = document.getElementById("home-filters");
    loginContainer.innerHTML = `
    <h2>Subfamilias</h2>
    <form id="filter-form">
        <select id="subfamilias" name="subfamilias">
        </select>
        <button id="btn-filter" type="submit">Buscar</button>
    </form>
  `;
    const select = document.getElementById("subfamilias");
    Object.values(familias).forEach((familia) => {
      familia.subfamilias.forEach((subfamilia) => {
        const option = document.createElement("option");
        option.value = `${subfamilia.refsubfamilia}`;
        option.textContent = `${subfamilia.descripcion}-${subfamilia.reffamilia}`;
        select.appendChild(option);
      });
    });
    const form = document.getElementById("filter-form");
    form.addEventListener("submit", async (event) => {
      event.preventDefault();
      const subfamiliaSeleccionada = select.value;
      let productos = await this.getProducts(subfamiliaSeleccionada);
      this.products = productos.data;
      this.paintProducts();
    });
  }

  paintProducts() {
    const container = document.getElementById("home-container");
    container.innerHTML = "";
    if (!this.products || this.products.length === 0) {
      container.innerHTML = `<p>No hay productos disponibles.</p>`;
      return;
    }
    const grid = document.createElement("div");
    grid.classList.add("products-grid");
    this.products.forEach((product) => {
      const card = document.createElement("div");
      card.classList.add("product-card");
      const img = document.createElement("img");
      img.src = product.img_ppal_min || "img/no-image.png";
      img.alt = product.descripcion || "Producto";
      card.appendChild(img);
      const title = document.createElement("h3");
      title.textContent = product.descripcion || "Producto sin nombre";
      card.appendChild(title);
      card.onclick = async () => {
        await api.productSeenByUser(product.refProducto, this.userData.user_id);
        localStorage.setItem("refProducto", JSON.stringify(product.refProducto));
        window.location.href = "producto.html";
      };
      grid.appendChild(card);
    });
    container.appendChild(grid);
  }

  paintLastSeenProducts() {
    const container = document.getElementById("home-last-seen");
    container.innerHTML = "";

    if (!this.productsVistosFinal || this.productsVistosFinal.length === 0) {
      container.innerHTML = `<p>No hay productos vistos recientemente.</p>`;
      return;
    }

    const lastseen = document.createElement("h2");
    lastseen.textContent = "Productos vistos recientemente";
    container.appendChild(lastseen);

    const grid = document.createElement("div");
    grid.classList.add("products-grid");

    this.productsVistosFinal.forEach((product) => {
      const card = document.createElement("div");
      card.classList.add("product-card");

      const img = document.createElement("img");

      if (product.imagenes && Object.keys(product.imagenes).length > 0) {
        const firstImageKey = Object.keys(product.imagenes)[0];
        img.src = product.imagenes[firstImageKey]?.url_min || "img/no-image.png";
      } else {
        img.src = "img/no-image.png";
      }

      img.alt = product.descripcion || "Producto";
      card.appendChild(img);

      const title = document.createElement("h3");
      title.textContent = product.descripcion || "Producto sin nombre";
      card.appendChild(title);

      card.onclick = () => {
        localStorage.setItem("refProducto", JSON.stringify(product.refProducto));
        window.location.href = "producto.html";
      };

      grid.appendChild(card);
    });

    container.appendChild(grid);
  }
}
