import { Api } from "./api.js";
const api = new Api();
export class Home {
  constructor() {
    this.families = [];
    this.products = [];
  }

  async init() {
    try {
      this.families = await this.getFamilies();
      const firstFamilyKey = Object.keys(this.families.data)[0];
      const firstSubfamily = this.families.data[firstFamilyKey].subfamilias[0];
      const refSubfamilia = firstSubfamily.refsubfamilia;
      const productos = await this.getProducts(refSubfamilia);
      this.products = productos.data;
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
      const price = document.createElement("p");
      price.textContent = product.precio ? `${product.precio} €` : "Precio no disponible";
      card.appendChild(price);
      card.onclick = () => {
        localStorage.setItem("refProducto", JSON.stringify(product.refProducto));
        window.location.href = "producto.html";
      };
      grid.appendChild(card);
    });
    container.appendChild(grid);
  }
}
