import express from "express";
import ProductManager from "./productManager.js";
import { emitWarning } from "process";

const app = express();
const PORT = 4000;

app.use(express.urlencoded({ extended: true }));

const productManager = new ProductManager("./src/products.json");

app.get("/productos/:id", async (req, res) => {
  console.log(req.params.id);
  const id = parseInt(req.params.id);
  const product = await productManager.getProductById(id)
  product ? res.send(product) : res.send("Producto no encontrado");
});

app.get("/productos", async (req, res) => {
  const { limit } = req.query;
  const products = await productManager.getProducts();
   limit ?  res.send(products.slice(0, limit)): res.send(products)
});
app.get("*", (req, res) => {
  res.send("Error 404");
});

app.listen(PORT, () => {
  console.log(`Server connected on port ${PORT}`);
});
