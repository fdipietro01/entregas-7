const express = require("express");
const productosRouter = express.Router();
const Contenedor = require("../clases/producto");
const fs = require("fs");
const auth= require("../routes/auth.middleware");

const contenedorProducto = new Contenedor();

productosRouter.get("/:id?", (req, res) => {
  fs.readFile("../database/productos.txt", (err, data) => {
    if (err) {
      res.json("No hay productos en el catálogo");
    } else {
      if (req.params.id) {
        res.send({
          productoEncontrado: contenedorProducto.obtenerProductos(),
        });
      } else {
        res.send({ catalogo: contenedorProducto.obtenerProductos()});
      }
    }
  });
});

productosRouter.post("./", auth, (req, res)=>{
    const {name, descripcion, codigo, foto, precio, stock} = req.body;
    contenedorProducto.agregarProducto(name, descripcion, codigo, foto, precio, stock);
    fs.writeFile("../database/productos.txt", JSON.stringify(contenedorProducto.obtenerProductos()), (err, data) => {
        if (err) {
            res.json("No se pudo agregar el producto");
        } else {
            res.json("Producto agregado");
        }
    })
})

productosRouter.put("/:id", auth, (req, res)=>{
    fs.readFile("../database/productos.txt", (err, data) => {
        if (err) {
          res.json("No hay productos en el catálogo")}
              else{
                  if(req.params.id && req.body.producto){ 
                      contenedorProducto.reemplazarProducto(req.params.id, req.body.producto);
                  }
                      
                  }
                  
 






})
