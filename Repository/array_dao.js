module.exports = class ArrayDao {
    constructor() {
        this.coleccion = []
    }
    guardar(elemento){
        this.coleccion.push(elemento)
    }

    quitar(identificador){
        this.coleccion = this.coleccion.filter((elemento) => {
            return elemento.identificador != identificador
        })
    }

    cambiar(identificador, actualizacion = {}) {
        let objeto = this.coleccion.find(elemento => elemento.identificador == identificador)

        objeto = {...objeto, ...actualizacion}

        this.coleccion = this.coleccion.map(elemento => {
            if (elemento.identificador == objeto.identificador) {
                return objeto
            } else return elemento
        })
    }

    buscar(identificador = null) {
        if (!identificador){
            return this.coleccion
        }
        return this.coleccion.find(elemento => elemento.identificador == identificador)
    }
}