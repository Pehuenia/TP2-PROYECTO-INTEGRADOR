// Persistencia de modelos u objetos de dominio/negocio // DAO = DATA ACCESS OBJECT
// Otro patron de diseño. Cómo guardar los datos en una implementacion especifica
const ArrayDao = require('./array_dao.js')

class Repository{
    constructor(almacen = new ArrayDao) {
        this.almacen = almacen
    }

    crear(elemento) {
        this.almacen.guardar(elemento)
    }

    borrar(identificador) {
        this.almacen.quitar(identificador)
    }

    actualizar(identificador, actualizacion = {}) {
        this.almacen.cambiar(identificador, actualizacion)
    }

    obtener(identificador = null) {
        return this.almacen.buscar(identificador)
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