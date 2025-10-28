export class Api {
  constructor() {
    this.url = "http://localhost:3033";
  }

  async userLogin(username, password) {
    const url = this.url + "/user/login";
    try {
      const response = await fetch(url, {
        method: "POST",
        body: JSON.stringify({
          user: { username, password },
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      console.log(data.user);
      return data.user;
    } catch (error) {
      console.error("Error en userLogin:", error);
      throw error;
    }
  }

  async userRegister(username, password) {
    const url = this.url + "/user/register";
    try {
      const response = await fetch(url, {
        method: "POST",
        body: JSON.stringify({
          user: { username, password },
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      return data.user;
    } catch (error) {
      console.error("Error en userLogin:", error);
      throw error;
    }
  }

  async familiesGet() {
    const url = "https://www.es-tela.com/api/?r=es/familias&cli=003328&apikey=453971e94725572b4d171a6805d1fb95";
    try {
      const response = await fetch(url, {
        method: "GET",
      });
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error al recibir familas y subfamilas", error);
      throw error;
    }
  }

  async productsGet(subfamila) {
    const url = `https://www.es-tela.com/api/?r=es/productosEnSubfamilia/${subfamila}&cli=003328&apikey=453971e94725572b4d171a6805d1fb95&tipoimg=webp`;
    try {
      const response = await fetch(url, {
        method: "GET",
      });
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error al recibir productos", error);
      throw error;
    }
  }

  async productGet(refProducto) {
    const url = `https://www.es-tela.com/api/?r=es/producto/${refProducto}&cli=003328&apikey=453971e94725572b4d171a6805d1fb95`;
    try {
      const response = await fetch(url, {
        method: "GET",
      });
      return await response.json();
    } catch (error) {
      console.error("Error al recibir productos", error);
      throw error;
    }
  }

  async articleGet(refArticulo) {
    const url = `https://www.es-tela.com/api/?r=es/articulo/${refArticulo}&cli=003328&apikey=453971e94725572b4d171a6805d1fb95`;
    try {
      const response = await fetch(url, {
        method: "GET",
      });
      const respone = await response.json();
      return respone;
    } catch (error) {
      console.error("Error al recibir productos", error);
      throw error;
    }
  }

  async addArticleToShoppingCart(refArticulo, cantidad, precio, imagen, idUser) {
    const url = this.url + `/shoppingcart/${idUser}/add`;
    try {
      const response = await fetch(url, {
        method: "POST",
        body: JSON.stringify({
          article: {
            refArticulo: refArticulo,
            cantidad: cantidad,
            precio: precio,
            imagen: imagen,
          },
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error en addArticleToShoppingCart:", error);
      throw error;
    }
  }

  async deleteArticleFromShoppingCart(refArticulo, idUser) {
    const url = this.url + `/shoppingcart/${idUser}/${refArticulo}/`;
    try {
      const response = await fetch(url, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error en deleteArticleFromShoppingCart:", error);
      throw error;
    }
  }

  async getUserShoppingCart(idUser) {
    const url = `${this.url}/shoppingcart/${idUser}`;
    try {
      const response = await fetch(url, {
        method: "GET",
      });
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error en getUserShoppingCart:", error);
      throw error;
    }
  }

  async createPurchasebyUser(idUser) {
    const url = this.url + `/purchases/checkout/${idUser}`;
    try {
      const response = await fetch(url, {
        method: "POST",
      });
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error en createPurchasebyUser:", error);
      throw error;
    }
  }

  async getPurchasesByUser(idUser) {
    const url = `${this.url}/purchases/${idUser}`;
    try {
      const response = await fetch(url, {
        method: "GET",
      });
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error en getPurchasesByUser:", error);
      throw error;
    }
  }

  async productSeenByUser(refProducto, idUser) {
    const url = this.url + `/lastseen/productseen`;
    try {
      const response = await fetch(url, {
        method: "POST",
        body: JSON.stringify({
          userId: idUser,
          productId: refProducto,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error en productSeenByUser:", error);
      throw error;
    }
  }

  async getLastSeenByUser(idUser) {
    const url = `${this.url}/lastseen/${idUser}`;
    try {
      const response = await fetch(url, {
        method: "GET",
      });
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error en getLastSeenByUser:", error);
      throw error;
    }
  }
}
