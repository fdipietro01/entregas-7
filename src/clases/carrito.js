const fs = require("fs");

class CarritoContenedor {
  constructor(ruta = "carrito.txt", carritos = []) {
    this.carritos = carritos;
    this.idCounter = 0;
    this.ruta = ruta;
  }
  crearArchivo() {
    fs.writeFile(this.ruta, JSON.stringify(this.carritos), (err, data) =>
      err
        ? console.log("No se pudo Crear Archivo")
        : console.log("Archivo de carritos creado")
    );
  }

  archivoVacio() {
    const data = fs.readFileSync(this.ruta);
    return JSON.parse(data).length === 0;
  }

  escribirArchivo() {
    fs.writeFileSync(this.ruta, JSON.stringify(this.carritos));
  }

  agregarCarrito() {
    this.idCounter++;
    const nuevoCarrito = {
      id: this.idCounter,
      timestamp: Date(),
      productos: [],
    };
    this.carritos.push(nuevoCarrito);
    return nuevoCarrito.id;
  }

  eliminarCarrito(id) {
    const index = this.carritos.findIndex((p) => p.id === Number(id));
    if (index !== -1) {
      this.carritos.splice(index, 1);
      return true;
    }
    return false;
  }

  obtenerCarrito(id) {
    const carrito = this.carritos.find((c) => c.id === Number(id));
    return carrito ? carrito.productos : carrito;
  }

  agregarProducto(id, productos) {
    const carrito = this.carritos.find((c) => c.id === Number(id));
    carrito &&
      productos.forEach((element) => {
        const itemExistente = carrito.productos.find(
          (p) => p.id === element.id
        );
        !itemExistente && carrito.productos.push(element); //evita agregar items repetidos
      });
    return carrito;
  }
  eliminarProducto(id, idProducto) {
    const carrito = this.carritos.find((c) => c.id === Number(id));
    if (!carrito) return false 
    const index = carrito.productos.findIndex((p) => p.id === Number(idProducto));
    if(index === -1) return false;
    carrito.productos.splice(index, 1)
    return index;
  }
}
module.exports = CarritoContenedor;
