const RepositorioHabitaciones =  require('../repository/repositorioHabitaciones.js')
const RepositorioReservas =  require('../repository/repositorioReservas.js')
const Habitacion = require('../modelos/habitacion.js');
const Utils = require('../utils/utils.js');

module.exports = class HabitacionesService {
    constructor(){
        this.repositorioHabitaciones = new RepositorioHabitaciones();
        this.repositorioReservas = new RepositorioReservas();
    }

    async listarHabitaciones(id = null) {
        const resultado = await this.repositorioHabitaciones.listarHabitaciones(id);
        return resultado ? resultado : 'No se halló ninguna habitación con el id ingresado'
    }

    async crearHabitacion(tipo,piso,depto,capacidad,precio){
        const existeHabitacion = await this.repositorioHabitaciones.buscarPorPisoYDepto(piso,depto)
        if(!existeHabitacion){
            const habitacion = new Habitacion(tipo,piso,depto,capacidad,precio)
            return await this.repositorioHabitaciones.crearHabitacion(habitacion)
        }else{
            throw Error('La habitación ya existe')
        }
    }

    async eliminarHabitacion(id){
        const tieneReservasActivas = await this.repositorioReservas.listarReservasActivasPorHabitacion(id)
        if(!tieneReservasActivas){
            await this.repositorioHabitaciones.eliminarHabitacion(id)
        }else{
            throw Error('No puede eliminarse la habitación porque posee reservas activas')
        }
    }
    
    async actualizarHabitacion(id,habitacion){
        const habitacionExistente = await this.repositorioHabitaciones.buscarPorPisoYDepto(habitacion.piso,habitacion.depto)
        if(habitacionExistente && (habitacionExistente._id != id)){
            throw Error('No puede modificar la habitación porque los datos a actualizar corresponden a otra habitación ingresada')
        }else{
            await this.repositorioHabitaciones.actualizarHabitacion(id,habitacion)
        }
    }

    async habitacionesDisponiblesPorFecha(fechaDesde,fechaHasta){
        const habitaciones = await this.repositorioHabitaciones.listarHabitaciones()
        const reservasActivas = await this.repositorioReservas.listarReservas()
        return this.habitacionesDisponibles(Date.parse(fechaDesde),Date.parse(fechaHasta), habitaciones, reservasActivas)
    }
    
    habitacionesDisponibles(fechaDesde,fechaHasta,habitaciones, reservasActivas){
        const idHabitacionesOcupadasPorFecha = reservasActivas.filter(
            reserva => Utils.rangosDeFechasSolapados(
                reserva.fechaDesde, reserva.fechaHasta, fechaDesde,fechaHasta)).map(reserva => reserva.habitacionId)
        return habitaciones.filter(h => !idHabitacionesOcupadasPorFecha.includes(h.id))
    }
}