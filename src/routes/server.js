const express = require('express');
const app = express();

app.use("/api/productos", productosRouter)
app.use("/api/carrito", carritoRouter)


// ver tema del puerto
app.listen(8080, ()=>{console.log("Escuchando en el puerto 8080");})

