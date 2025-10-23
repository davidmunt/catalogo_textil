import { Api } from "./api.js";
const api = new Api();
export class Product {
  constructor() {
    this.refProducto = localStorage.getItem("refProducto");
    this.product = "";
    this.articte = "";
  }

  async init() {
    try {
      console.log(this.refProducto);
      const producto = await this.getProduct(this.refProducto);
      this.product = producto;
      const hijos = this.product.refArticulosHijos ? Object.values(this.product.refArticulosHijos) : [];
      if (hijos.length === 0) {
        console.warn("El producto no tiene artículos hijos");
        return;
      }
      const primArticulo = hijos[0];
      const articulo = await this.getProduct(primArticulo);
      this.articte = articulo.data;
      console.log(this.articte);
    } catch (error) {
      console.error("Error al inicializar Product:", error);
    }
  }

  async getProduct() {
    try {
      const response = await api.productGet(refProducto);
      console.log(response);
      return { success: true, data: response };
    } catch (error) {
      return { success: false, message: "Error al recibir data de product" };
    }
  }

  async getArticle() {
    try {
      const response = await api.productGet(refProducto);
      return { success: true, data: response };
    } catch (error) {
      return { success: false, message: "Error al recibir data de product" };
    }
  }

  paintProduct() {
    const container = document.getElementById("product-container");
    container.innerHTML = "";
  }
}
