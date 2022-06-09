const express = require('express');
const app = express();
const productosRouter = require('./routes/productos/index');
const carritoRouter = require('./routes/carrito/index');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api/productos", productosRouter)
app.use("/api/carrito", carritoRouter)


// ver tema del puerto
app.listen(8080, ()=>{console.log("Escuchando en el puerto 8080");})

