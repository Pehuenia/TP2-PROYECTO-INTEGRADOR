// Persistencia de modelos u objetos de dominio/negocio
class Repository{
    constructor() {
        this.coleccion = []
    }

    crear(elemento) {
        this.coleccion.push(elemento)
    }

    borrar(identificador) {
        this.coleccion = this.coleccion.filter((elemento) => {
            return elemento.identificador != identificador
        })
    }

    actualizar(identificador, actualizacion = {}) {
        let objeto = this.coleccion.find(elemento => elemento.identificador == identificador)

        objeto = {...objeto, ...actualizacion}

        this.coleccion = this.coleccion.map(elemento => {
            if (elemento.identificador == objeto.identificador) {
                return objeto
            } else return elemento
        })

    }

    obtener(identificador = null) {
        if (!identificador){
            return this.coleccion
        }
        return this.coleccion.find(elemento => elemento.identificador == identificador)
    }
}

const repo = new Repository

const objetoNuevo = {
    identificador: 1,
    nombre: 'ejemplo1',
    pais: 'Argentina'
}

const objetoNuevo2 = {
    identificador: 2,
    nombre: 'ejemplo2',
    pais: 'Brasil'
}
const objetoNuevo3 = {
    identificador: 3,
    nombre: 'ejemplo3',
    pais: 'Francia'
}

repo.crear(objetoNuevo)
repo.crear(objetoNuevo2)
repo.crear(objetoNuevo3)

console.log("--- Crear")
console.log(repo)

repo.borrar('ojota')

console.log("--- Borrar")
console.log(repo)

repo.actualizar(3, {pais: 'India', color: 'verde'})

console.log("--- Actualizar");
console.log(repo);

const resultado1 = repo.obtener()
const resultado2 = repo.obtener(1)

console.log("--- Obtener todos");
console.log(resultado1);
console.log("--- Obtener con identificador");
console.log(resultado2);