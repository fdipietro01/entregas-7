const express = require("express");
const productosRouter = express.Router();
const Contenedor = require("../../clases/producto");
const autorizacion = require("../middlewares/auth.middleware");

const contenedorProducto = new Contenedor();
contenedorProducto.crearArchivo();

productosRouter.get("/:id?", async (req, res) => {
  const vacio = contenedorProducto.archivoVacio();
  if (vacio) res.json({ respuesta: "Catalogo Vacio" });
  else {
    if (!req.params.id)
      res.json({
        respuesta: "Id no especificado",
        catalogo: contenedorProducto.obtenerProductos(),
      });
    else {
      const producto = contenedorProducto.obtenerProductos(req.params.id);
      res.json({
        respuesta: `Producto nº${req.params.id}`,
        catalogo: producto ? producto : "Producto no encontrado",
      });
    }
  }
});

productosRouter.post("/", autorizacion, (req, res) => {
  const { name, descripcion, codigo, foto, precio, stock } = req.body;
  if (!name || !descripcion || !codigo || !foto || !precio || !stock) {
    res.json({ respuesta: "No se pudo agregar, campos faltantes" });
  } else {
    contenedorProducto.agregarProducto(
      name,
      descripcion,
      codigo,
      foto,
      precio,
      stock
    );

    const respuesta = contenedorProducto.escribirArchivo();
    res.json({ respuesta: "Producto agregado correctamente" });
  }
});

productosRouter.put("/:id", autorizacion, (req, res) => {
  const vacio = contenedorProducto.archivoVacio();
  if (vacio) res.json({ respuesta: "Catalogo Vacio" });
  else {
    if (!req.body || Object.keys(req.body).length === 0)
      res.json({ respuesta: "Error en parámetros de la solicitud" });
    else {
      contenedorProducto.reemplazarProducto(req.params.id, req.body);
      contenedorProducto.escribirArchivo();
      res.json({ respuesta: "Producto reemplazado correctamente" });
    }
  }
});

productosRouter.delete("/:id", autorizacion, (req, res) => {
  const vacio = contenedorProducto.archivoVacio();
  if (vacio) res.json({ respuesta: "Catalogo Vacio" });
  else {
    contenedorProducto.borrarProducto(req.params.id);
    contenedorProducto.escribirArchivo();
    res.json({ respuesta: "Producto eliminado" });
  }
});

module.exports = productosRouter;
