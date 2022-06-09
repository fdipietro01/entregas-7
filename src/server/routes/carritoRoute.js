const express = require("express");
const carritoRouter = express.Router();
const CarritoContenedor = require("../../clases/carrito");

const carritos = new CarritoContenedor();
carritos.crearArchivo();

carritoRouter.post("/", (req, res) => {
  const id = carritos.agregarCarrito();
  carritos.escribirArchivo();
  res.send({ respuesta: "Carrito creado", id: id });
});

carritoRouter.delete("/:id", (req, res) => {
  const id = req.params.id;
  const vacio = carritos.archivoVacio();
  if (vacio) res.send({ respuesta: "No hay carritos para eliminar" });
  else {
    const resultado = carritos.eliminarCarrito(id);
    carritos.escribirArchivo();
    resultado ? res.send({ respuesta: "Carrito eliminado correctamente" }) : res.send({ respuesta: "No se pudo eliminar el carrito" });
  }
});

carritoRouter.get("/:id/productos", (req, res) => {
  const id = req.params.id;
  const vacio = carritos.archivoVacio();
  if (vacio) res.send({ respuesta: "No hay carritos" });
  else {
    const productos = carritos.obtenerCarrito(id);
    productos
      ? res.send({ respuesta: "Productos obtenidos", productos })
      : res.send({ respuesta: "No existe el carrito" });
  }
});

carritoRouter.post("/:id/productos", (req, res) => {
  const id = req.params.id;
  const vacio = carritos.archivoVacio();
  if (vacio) res.send({ respuesta: "No hay carritos" });
  else {
    console.log("thhe body", req.body)
    const productos = req.body;
    const respuesta = carritos.agregarProducto(id, productos);
    carritos.escribirArchivo();
    respuesta? res.send({ respuesta: "Productos agregados" }) : res.send({ respuesta: "Carrito inexistente" });
  }
});

carritoRouter.delete("/:id/productos/:id_prod", (req, res) => {
  const { id, id_prod } = req.params;
  const vacio = carritos.archivoVacio();
  if (vacio) res.send({ respuesta: "No existe el carrito" });
  else {
    const resultado = carritos.eliminarProducto(id, id_prod);
    carritos.escribirArchivo();
    resultado
      ? res.send({ respuesta: "Producto eliminado" })
      : res.send({ respuesta: "No existe el carrito/producto" });
  }
});

module.exports = carritoRouter;
