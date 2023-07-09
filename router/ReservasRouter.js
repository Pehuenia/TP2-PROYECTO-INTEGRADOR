const express = require('express')
const ReservasController = require('../controller/reservasController')

module.exports = class ReservasRouter {
    constructor(){
        this.router = express.Router()
        this.reservasController = new ReservasController()
    }

    start(){
        //Modificar get id a path variable para distinguir id cliente de id habitacion
        this.router.get('/:id?', this.reservasController.getReservas)
        this.router.post('/', this.reservasController.crearReserva),
        this.router.put('/:id?', this.reservasController.actualizarReserva)
        this.router.delete('/:id?', this.reservasController.cancelarReserva)
        
        return this.router
    }
}