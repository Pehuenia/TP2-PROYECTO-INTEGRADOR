const RepositorioReservas =  require('../repository/repositorioReservas')
const RepositorioHabitaciones =  require('../repository/repositorioHabitaciones.js')
const ReservaBuilder = require('../modelos/reservaBuilder')
const utils = require('../utils/utils')

module.exports = class ReservasService {
    constructor(){
        this.repositorioReservas = new RepositorioReservas();
        this.repositorioHabitaciones = new RepositorioHabitaciones();
    }

    async listarReservas(id){
        return await this.repositorioReservas.listarReservas(id)
    }

    async listarReservasPorCliente(idCliente){
        //Validar que exista cliente
        return await this.repositorioReservas.listarReservasPorCliente(idCliente)
    }

    async listarReservasActivasPorHabitación(idHabitacion){
        const existeHabitacion = this.repositorioHabitaciones.listarHabitaciones(id)
        if(existeHabitacion){
            return await this.repositorioReservas.listarReservasActivasPorHabitacion(idHabitacion)
        }else {
            throw Error('La habitación ingresada no existe')
        }
    }

    async crearReserva(fechaDesde,fechaHasta,habitacionId,clienteId) {
        const fechaDesdeFormat = Date.parse(fechaDesde)
        const fechaHastaFormat = Date.parse(fechaHasta)

        if(utils.diasEntreDosFechas(fechaDesdeFormat, fechaHastaFormat) < 3){
            throw Error('La reserva mínima permitida es por el plazo de 3 días')
        }

        const reservaBuilder = new ReservaBuilder()
        const reserva = reservaBuilder.setFechaDesde(fechaDesdeFormat).setFechaHasta(fechaHastaFormat).setHabitacionId(habitacionId).setClienteId(clienteId).build()
        const reservasActivasDeLaHabitacion = await this.repositorioReservas.listarReservasActivasPorHabitacion(habitacionId)
        if(this.reservaValida(reserva, reservasActivasDeLaHabitacion)){
            return await this.repositorioReservas.crearReserva(reserva)
        }else{
            throw Error('La habitación ya se encuentra reservada en ese período')
        }
    }

    async cancelarReserva(id){
        const reservaACancelar = await this.repositorioReservas.listarReservas(id)
        if(cancelacionValida(reserva)){
            await this.repositorioReservas.eliminarReserva(id)
        }else{
            throw Error('Las reservas no pueden ser canceladas con menos de 6 días de anticipación')
        }
    }

    async actualizarReserva(id,reserva){

        const reservaAActualizar = await this.repositorioReservas.listarReservas(id)
        if(reserva.idCliente && (reserva.idCliente != reservaAActualizar)){
            throw Error('No se puede modificar el cliente asociado a la reserva')
        }else{
            //Validar que si mofico las fechas no se suporponga con alguna existente 

            if((reserva.fechaDesde && (reserva.fechaDesde != reservaAActualizar.fechaDesde))
            || (reserva.fechaHasta && (reserva.fechaHasta != reservaAActualizar.fechaHasta))){
                const reservasActivasDeLaHabitacion = this.repositorioReservas.listarReservasActivasPorHabitacion(habitacionId)
                
                //Crear nueva reserva con esas fechas o actualizar los de reserva a realizar
                if(this.reservaValida(reserva, reservasActivasDeLaHabitacion.filter( r => r._id != id))){
                    reservaAActualizar = await this.repositorioReservas.actualizarReserva(id,reserva)
                }

            }
        }
    }

    cancelacionValida(reserva){
        return (utils.diasEntreDosFechas(new Date(),reserva.fechaDesde) < 6)
    }

    reservaValida(reservaARealizar, reservasActivasDeLaHabitacion){
        let esValida = true;
        reservasActivasDeLaHabitacion.forEach(reserva => {
            if(utils.rangosDeFechasSolapados(reserva.fechaDesde, reserva.fechaHasta,
                reservaARealizar.fechaDesde,reservaARealizar.fechaHasta )){
                    esValida = false;
            }
            
        });

        return esValida;
    }
}