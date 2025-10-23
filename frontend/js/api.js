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
    console.log(url);
    try {
      const response = await fetch(url, {
        method: "GET",
      });
      console.log(response);
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
      return await response.json();
    } catch (error) {
      console.error("Error al recibir productos", error);
      throw error;
    }
  }
}
