const express = require('express')
const HabitacionesController = require('../controller/habitacionesController.js')

module.exports = class HabitacionesRouter {
    constructor(){
        this.router = express.Router()
        this.habitacionesController = new HabitacionesController()
    }

    start(){
        this.router.get('/:id?', this.habitacionesController.getHabitaciones)
        this.router.post('/', this.habitacionesController.crearHabitacion)
        this.router.put('/:id?', this.habitacionesController.actualizarHabitacion)
        this.router.delete('/:id?', this.habitacionesController.eliminarHabitacion)
        
        return this.router
    }
}