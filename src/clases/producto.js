class Contenedor {
    constructor() {
        this.productos = [];
        this.idCounter = 0;
    }    

    agregarProducto(name, descripcion, codigo, foto, precio, stock ){
        const id = this.idCounter ++
        const timestamp = new Date.now()
        const nuevoProd = {
            name,
            descripcion,
            codigo,
            foto,
            precio,
            stock,
            id,
            timestamp,

        }
        this.productos.push(nuevoProd);
    }
    //obtiene producto por id, o devuelve la colección entera por defecto
    obtenerProductos(id = undefined){
        id ? this.productos.find(p => p.id === id) : this.productos;
    }

    //reemplaza un producto por otro a partir del id
    reemplazarProducto(id, reemplazo){
        const index = this.productos.findIndex(p => p.id === id);
        this.productos.splice(index, 1, reemplazo)
    }

    //borra un producto por su id y reordena la secuencia de ids
    borrarProducto(id){
        const counter = 0
        for(let i = 0; i < this.productos.length; i++){
            if(this.productos[i].id === id ){
                this.productos.splice(i, 1);
            }
            else{
                counter ++
                this.productos[i].id === counter
            }
        }
        this.idCounter = this.productos[this.productos.length-1].id         
    }
}

module.exports = Contenedor;