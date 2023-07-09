const ReservasService = require('../service/reservasService')

module.exports = class ReservasController{
    constructor(){
        this.reservasService = new ReservasService()
    }

    getReservasActivasPorHabitacion = async (req,res) => {
        let {id} = req.params
        const resultado = await this.reservasService.listarReservasActivasPorHabitación(id)
        res.status(200).json( resultado ? resultado :{ message : 'No existen reservas asociadas a la habitación' })
    }

    getReservas = async (req,res) => {
        let {id} = req.params
        const resultado = await this.reservasService.listarReservas(id)
        res.status(200).json( resultado ? resultado :{ message : 'No existen reservas' })
    }

    getReservasActivasPorCliente = async (req,res) => {
        let {id} = req.params
        try{
            const resultado = await this.reservasService.listarReservasPorCliente(id)
            res.status(200).json( resultado ? resultado :{ message : 'No existen reservas asociadas al cliente' })
        }catch(error){
            res.status(404).json({error: error.message})
        }
        
    }

    crearReserva =async (req,res) => {
        let reserva = req.body;
        try{
            const resultado = await this.reservasService.crearReserva(
                reserva.fechaDesde,
                reserva.fechaHasta,
                reserva.habitacionId,
                reserva.clienteId
            )
            res.status(201).json(resultado)
        }catch(error){
            res.status(400).json({error: error.message})
        }
    }


    cancelarReserva = async (req, res) => {
        let {id} = req.params
        try{
            const resultado = await this.reservasService.cancelarReserva(id)
            res.status(200).json(resultado)
        }catch(error){
            res.status(400).json({error: error.message})
        }
    }

    actualizarReserva = async (req, res) => {
        let {id} = req.params
        let reserva= req.body;

        try{
            const resultado = await this.reservasService.actualizarReserva(id,reserva)
            res.status(200).json(resultado)
        }catch(error){
            res.status(400).json({error: error.message})
        }
    }
    
}