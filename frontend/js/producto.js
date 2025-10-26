import { Api } from "./api.js";
const api = new Api();
export class Product {
  constructor() {
    this.refProducto = JSON.parse(localStorage.getItem("refProducto"));
    this.product = "";
    this.articles = "";
    this.article = "";
    this.userData = JSON.parse(localStorage.getItem("User"));
  }

  async init() {
    try {
      const response = await this.getProduct(this.refProducto);
      this.product = response.data;
      console.log(this.product);
      this.articles = Object.values(this.product.refArticulosHijos);
      if (this.articles.length === 0) {
        console.log("El producto no tiene artículos hijos");
        return;
      }
      const primArticulo = this.articles[0];
      const articulo = await this.getArticle(primArticulo);
      this.article = articulo.data;
      console.log(this.article);
    } catch (error) {
      console.error("Error al inicializar Product:", error);
    }
  }

  async getProduct() {
    try {
      const response = await api.productGet(this.refProducto);
      return { success: true, data: response };
    } catch (error) {
      return { success: false, message: "Error al recibir data de product" };
    }
  }

  async getArticle(refProducto) {
    try {
      const response = await api.articleGet(refProducto);
      return { success: true, data: response };
    } catch (error) {
      return { success: false, message: "Error al recibir data de product" };
    }
  }

  paintProduct() {
    const container = document.getElementById("product-container");
    container.innerHTML = "";

    const title = document.createElement("h1");
    title.classList.add("product-title");
    title.id = "product-title";
    title.textContent = this.product.titulo;
    container.appendChild(title);

    const desc = document.createElement("p");
    desc.classList.add("product-desc");
    desc.id = "product-desc";
    desc.textContent = "Descricion: " + this.product.descripcion;
    container.appendChild(desc);

    const descSubfamilia = document.createElement("p");
    descSubfamilia.classList.add("product-subfamily");
    descSubfamilia.id = "product-subfamily";
    descSubfamilia.textContent = "Subfamilia: " + this.product.descSubfamilia;
    container.appendChild(descSubfamilia);

    const textColores = document.createElement("p");
    textColores.classList.add("product-colors-text");
    textColores.id = "product-colors-text";
    textColores.textContent = "Colores disponibles: ";
    container.appendChild(textColores);
    const coloresContainer = document.createElement("div");
    coloresContainer.classList.add("product-colors-container");
    coloresContainer.id = "product-colors";
    this.product.colores.forEach((color) => {
      const colorDiv = document.createElement("div");
      colorDiv.classList.add("color-item");
      const name = document.createElement("span");
      name.textContent = color.descColor;
      colorDiv.appendChild(name);
      coloresContainer.appendChild(colorDiv);
    });
    container.appendChild(coloresContainer);
  }

  paintSelectorArticle() {
    const container = document.getElementById("selector-article-container");
    container.innerHTML = "";

    //selector cantidad
    const divCant = document.createElement("div");

    const cantTexto = document.createElement("label");
    cantTexto.textContent = "Cantidad: ";
    cantTexto.setAttribute("for", "quantity-input");
    cantTexto.classList.add("quantity-label");

    const cantValor = document.createElement("input");
    cantValor.type = "number";
    cantValor.id = "quantity-input";
    cantValor.classList.add("quantity-input");
    cantValor.min = 1;
    cantValor.max = this.article.disponible || 1;
    cantValor.value = 1;

    divCant.classList.add("quantity-container");
    divCant.appendChild(cantTexto);
    divCant.appendChild(cantValor);
    container.appendChild(divCant);

    //boton añadir carrito
    const btnComprar = document.createElement("button");
    btnComprar.classList.add("btn-buy");
    btnComprar.id = "btn-buy";
    btnComprar.textContent = "Añadir al Carrito";
    btn.onclick = () => {
      this.api.addArticleToShoppingBag(this.article.refArticulo, cantValor.value, this.userData.user_id);
    };
    container.appendChild(btnComprar);

    //selector articulo
    const articuloSelectordiv = document.createElement("div");

    const articuloTexto = document.createElement("label");
    articuloTexto.textContent = "Selecciona artículo: ";
    articuloTexto.setAttribute("for", "article-select");
    articuloTexto.classList.add("article-label");

    const articuloSelector = document.createElement("select");
    articuloSelector.id = "article-select";
    articuloSelector.classList.add("article-select");
    this.articles.forEach((articulo) => {
      const option = document.createElement("option");
      option.value = articulo;
      option.textContent = articulo;
      if (articulo === this.article.refArticulo) option.selected = true;
      articuloSelector.appendChild(option);
    });

    articuloSelectordiv.classList.add("article-select-container");
    articuloSelectordiv.appendChild(articuloTexto);
    articuloSelectordiv.appendChild(articuloSelector);
    container.appendChild(articuloSelectordiv);

    articuloSelector.addEventListener("change", async (event) => {
      const selectedRef = event.target.value;
      try {
        const articulo = await this.getArticle(selectedRef);
        this.article = articulo.data;
        this.paintArticle();
        cantValor.max = this.article.disponible || 1;
        cantValor.value = 1;
      } catch (error) {
        console.error("Error al cambiar de artículo:", error);
      }
    });
    cantValor.addEventListener("input", () => {
      if (cantValor.value < 1) cantValor.value = 1;
      if (cantValor.value > this.article.disponible) cantValor.value = this.article.disponible;
    });
  }

  paintArticle() {
    const container = document.getElementById("article-container");
    container.innerHTML = "";

    const title = document.createElement("h2");
    title.classList.add("article-title");
    title.id = "article-title";
    title.textContent = this.article.refArticulo;
    container.appendChild(title);

    const price = document.createElement("p");
    price.classList.add("article-despricec");
    price.id = "article-price";
    price.textContent = "Precio PVP: " + this.article.pvp + "€";
    container.appendChild(price);

    const stock = document.createElement("p");
    stock.classList.add("article-stock");
    stock.id = "article-stock";
    stock.textContent = "Stock disponible: " + this.article.disponible;
    container.appendChild(stock);

    const desc = document.createElement("p");
    desc.classList.add("article-desc");
    desc.id = "article-desc";
    desc.textContent = this.article.descripcion;
    container.appendChild(desc);

    const specialDesc = document.createElement("p");
    specialDesc.classList.add("article-special-desc");
    specialDesc.id = "article-special-desc";
    specialDesc.textContent = this.article.descripcionEspecial;
    container.appendChild(specialDesc);

    const size = document.createElement("p");
    size.classList.add("article-size");
    size.id = "article-size";
    size.textContent = "Talla: " + this.article.descTalla;
    container.appendChild(size);

    const color = document.createElement("p");
    color.classList.add("article-color");
    color.id = "article-color";
    color.textContent = "Color: " + this.article.descColor;
    container.appendChild(color);

    const descComposicion = document.createElement("p");
    descComposicion.classList.add("product-composition");
    descComposicion.id = "product-composition";
    descComposicion.textContent = "Composición: " + this.product.descComposicion;
    container.appendChild(descComposicion);

    const descAcabado = document.createElement("p");
    descAcabado.classList.add("product-finish");
    descAcabado.id = "product-finish";
    descAcabado.textContent = "Acabado: " + this.product.descAcabado;
    container.appendChild(descAcabado);

    const imagesDiv = document.createElement("div");
    imagesDiv.classList.add("article-images-slider");
    imagesDiv.id = "article-images-slider";
    const imagesArray = Object.values(this.article.imagenes);
    const sliderInner = document.createElement("div");
    sliderInner.classList.add("slider-inner");
    imagesArray.forEach((img) => {
      const imageElem = document.createElement("img");
      imageElem.src = img.url_min;
      imageElem.alt = this.article.titulo;
      imageElem.classList.add("slider-img");
      sliderInner.appendChild(imageElem);
    });
    imagesDiv.appendChild(sliderInner);
    const prevBtn = document.createElement("button");
    prevBtn.innerText = "<";
    prevBtn.classList.add("slider-btn", "prev");
    const nextBtn = document.createElement("button");
    nextBtn.innerText = ">";
    nextBtn.classList.add("slider-btn", "next");
    imagesDiv.appendChild(prevBtn);
    imagesDiv.appendChild(nextBtn);
    container.appendChild(imagesDiv);

    let currentIndex = 0;
    const sliderImages = sliderInner.querySelectorAll(".slider-img");
    function updateSlider() {
      sliderInner.style.transform = `translateX(-${currentIndex * 100}%)`;
    }
    prevBtn.addEventListener("click", () => {
      currentIndex = (currentIndex - 1 + sliderImages.length) % sliderImages.length;
      updateSlider();
    });
    nextBtn.addEventListener("click", () => {
      currentIndex = (currentIndex + 1) % sliderImages.length;
      updateSlider();
    });
    updateSlider();
  }
}
