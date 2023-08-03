import { promises as fs } from "fs";

export default class ProductManager {
  constructor(path) {
    this.path = path;
    this.poducts = [];
  }
  async addProduct(product) {
    let products = JSON.parse(await fs.readFile(`./${this.path}`, "utf-8"));
    if (products.find((prod) => prod.code == product.code)) {
      console.log("Producto ya presente con este codigo");
      return "Producto ya presente con este codigo";
    }

    if (
      product.title &&
      product.description &&
      product.thumbnail &&
      product.code &&
      product.id &&
      product.code != "" &&
      product.stock >= 0
    ) {
      products.push(product);
      console.log("producto agregado");
      await fs.writeFile(`./${this.path}`, JSON.stringify(products));
      return product;
    } else {
      return "Producto incompleto";
    }
  }

  async getProducts() {
    let products = JSON.parse(await fs.readFile(`./${this.path}`, "utf-8"));
    // console.log(products);
    return products
  }

  async getProductById(id) {
    let products = JSON.parse(await fs.readFile(`./${this.path}`, "utf-8"));
    const prod = products.find((producto) => producto.id === id);
    if (prod) {
        console.log(prod)
      return prod
    } else {
      console.log("Producto no existe");
    }
  }

  async deleteById(id) {
    let products = JSON.parse(await fs.readFile(`./${this.path}`, "utf-8"));

    const prods = products.filter((prod) => prod.id != id);

    await fs.writeFile(`./${this.path}`, JSON.stringify(prods));
    console.log("Producto eliminado");
  }

  async updateProduct(id, updatedFields) {
    let products = JSON.parse(await fs.readFile(`./${this.path}`, "utf-8"));

    let foundIndex = products.findIndex((item) => item.id === id);

    if (foundIndex === -1) {
      console.log("No se encontro el producto con el ID especificado");
      return null;
    }

    let updatedProduct = { ...products[foundIndex], ...updatedFields };
    products[foundIndex] = updatedProduct;

    await fs.writeFile(`./${this.path}`, JSON.stringify(products));

    console.log("Producto actualizado");
    return updatedProduct;
  }
}

class Product {
  constructor(title, description, price, thumbnail, code, stock) {
    this.title = title;
    this.description = description;
    this.price = price;
    this.thumbnail = thumbnail;
    this.code = code;
    this.stock = stock;
    this.id = Product.incrementarID();
  }
  //static significa metodo de clase
  static incrementarID() {
    if (this.idIncrement) {
      //Atributo de la clase. Si no existe, lo creo. Si existe, lo aumento en 1
      this.idIncrement++; //Si existe, lo aumento en uno
    } else {
      this.idIncrement = 1; //Valor inicial
    }
    return this.idIncrement;
  }
}
