const fs = require("fs");

class Contenedor {
  constructor(ruta = "catalogo.txt", productos = []) {
    this.productos = productos;
    this.idCounter = 0;
    this.ruta = ruta;
  }

  crearArchivo() {
    fs.writeFile(this.ruta, JSON.stringify(this.productos), (err, data) =>
      err
        ? console.log("No se pudo Crear Archivo")
        : console.log("Archivo Creado")
    );
  }

  archivoVacio() {
    const data = fs.readFileSync(this.ruta);
    return JSON.parse(data).length === 0;
  }

  escribirArchivo() {
    fs.writeFileSync(this.ruta, JSON.stringify(this.obtenerProductos()));
  }

  agregarProducto(name, descripcion, codigo, foto, precio, stock) {
    this.idCounter++;
    const timestamp = Date.now();
    const nuevoProd = {
      name,
      descripcion,
      codigo,
      foto,
      precio,
      stock,
      id: this.idCounter,
      timestamp,
    };
    this.productos.push(nuevoProd);
  }
  //obtiene producto por id, o devuelve la colección entera por defecto
  obtenerProductos(id = undefined) {
    return id !== undefined
      ? this.productos.find((p) => p.id === Number(id))
      : this.productos;
  }

  //reemplaza un producto por otro a partir del id
  reemplazarProducto(id, reemplazo) {
    const index = this.productos.findIndex((p) => p.id === Number(id));
    this.productos.splice(index, 1, reemplazo);
  }

  //borra un producto por su id y reordena la secuencia de ids
  borrarProducto(id) {
    const index = this.productos.findIndex((p) => p.id === Number(id));
    this.productos.splice(index, 1);
  }
}

module.exports = Contenedor;
