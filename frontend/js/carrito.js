import { Api } from "./api.js";
const api = new Api();
export class ShoppingCart {
  constructor() {
    this.shoppingCartData = "";
    this.historyData = "";
    this.userData = JSON.parse(localStorage.getItem("User"));
  }

  async init() {
    try {
      const response = await this.getShoppingCart();
      this.shoppingCartData = response.data.shoppingCart.articles || [];
      this.totalPrice = response.data.shoppingCart.totalPrice || 0;
      const history = await this.getHistory();
      this.historyData = history.data;
    } catch (error) {
      console.error("Error al inicializar ShoppingCart:", error);
    }
  }

  async getShoppingCart() {
    try {
      const response = await api.getUserShoppingCart(this.userData.user_id);
      return { success: true, data: response };
    } catch (error) {
      return { success: false, message: "Error al recibir data del carrito" };
    }
  }

  async getHistory() {
    try {
      const response = await api.getUserShoppingCart(this.userData.user_id);
      return { success: true, data: response };
    } catch (error) {
      return { success: false, message: "Error al recibir data del carrito" };
    }
  }

  paintShoppingCart() {
    const container = document.getElementById("shopping-cart-container");
    container.innerHTML = "";

    if (!this.shoppingCartData || this.shoppingCartData.length === 0) {
      const emptyMsg = document.createElement("p");
      emptyMsg.textContent = "No tienes articulos añadidos al carrito";
      container.appendChild(emptyMsg);
      return;
    }

    const articlesDiv = document.createElement("div");
    articlesDiv.classList.add("shoppingcart-articles");
    container.appendChild(articlesDiv);

    let totalPrice = 0;

    this.shoppingCartData.forEach((article) => {
      const articleRow = document.createElement("div");
      articleRow.classList.add("shoppingcart-item");

      const ref = document.createElement("span");
      ref.classList.add("item-ref");
      ref.textContent = `Ref: ${article.refArticulo}`;

      const img = document.createElement("img");
      img.classList.add("item-image");
      img.src = article.imagen;
      img.alt = article.refArticulo;

      const qty = document.createElement("span");
      qty.classList.add("item-qty");
      qty.textContent = `Cantidad: ${article.cantidad}`;

      const price = document.createElement("span");
      price.classList.add("item-price");
      price.textContent = `Precio unitario: ${article.precio.toFixed(2)} €`;

      const btnDelete = document.createElement("button");
      btnDelete.classList.add("btn-delete");
      btnDelete.innerHTML = "🗑️";

      btnDelete.onclick = async () => {
        try {
          await api.deleteArticleFromShoppingCart(article.refArticulo, this.userData.user_id);
          const response = await this.getShoppingCart();
          this.shoppingCartData = response.data.shoppingCart.articles || [];
          this.totalPrice = response.data.shoppingCart.totalPrice || 0;
          this.paintShoppingCart();
        } catch (error) {
          console.error("Error al eliminar articulo", error);
        }
      };

      articleRow.appendChild(ref);
      articleRow.appendChild(img);
      articleRow.appendChild(qty);
      articleRow.appendChild(price);
      articleRow.appendChild(btnDelete);

      articlesDiv.appendChild(articleRow);
    });

    const totalDiv = document.createElement("div");
    totalDiv.classList.add("shoppingcart-total");
    totalDiv.textContent = `Total: ${this.totalPrice} €`;
    container.appendChild(totalDiv);

    const btnBuy = document.createElement("button");
    btnBuy.classList.add("btn-purchase");
    btnBuy.textContent = "Realizar compra";
    btnBuy.onclick = () => {
      this.makePurchase();
    };
    container.appendChild(btnBuy);
  }

  paintViewShopping() {
    const container = document.getElementById("selector-view");
    container.innerHTML = "";

    const btnShowShoppingCart = document.createElement("button");
    btnShowShoppingCart.classList.add("btn-show-shoppingcart");
    btnShowShoppingCart.id = "btn-show-shoppingcart";
    btnShowShoppingCart.textContent = "Carrito";
    btnShowShoppingCart.onclick = () => {
      this.paintShoppingCart();
    };
    container.appendChild(btnShowShoppingCart);

    const btnShowhistory = document.createElement("button");
    btnShowhistory.classList.add("btn-show-history");
    btnShowhistory.id = "btn-show-history";
    btnShowhistory.textContent = "Historial";
    btnShowhistory.onclick = () => {
      this.paintShoppingCart();
    };
    container.appendChild(btnShowhistory);
  }
}
