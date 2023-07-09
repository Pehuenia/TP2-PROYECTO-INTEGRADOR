const HabitacionesService  =  require('../service/habitacionesService.js')

module.exports = class HabitacionesController {
    constructor(){
        this.habitacionesService = new HabitacionesService()
    }

    getHabitaciones = async (req,res) => {
        let {id} = req.params
        if(req.query){
            this.listarHabitacionesPorFecha(req,res)
        }else{
            res.json( await this.habitacionesService.listarHabitaciones(id))
        }
    }

    eliminarHabitacion = async (req, res) => {
        let {id} = req.params
        try{
            const resultado = await this.habitacionesService.eliminarHabitacion(id)
            res.status(200).json(resultado)
        }catch(error){
            res.status(400).json({error: error.message})
        }
    }

    actualizarHabitacion = async (req, res) => {
        let {id} = req.params
        let habitacion = req.body;

        try{
            const resultado = await this.habitacionesService.actualizarHabitacion(id,habitacion)
            res.status(200).json(resultado)
        }catch(error){
            res.status(400).json({error: error.message})
        }
    }

    crearHabitacion = async (req,res) => {
        let habitacion = req.body;
        try{
            const resultado = await this.habitacionesService.crearHabitacion(
                habitacion.tipo,
                habitacion.piso,
                habitacion.depto,
                habitacion.capacidad,
                habitacion.precio
            )
            res.status(201).json(resultado)
        }catch(error){
            res.status(400).json({error: error.message})
        }
    }

    listarHabitacionesPorFecha = async(req,res) => {
        console.log("req.query",req.query)
        let {fechaDesde} = req.query
        let {fechaHasta} = req.query

        try{
            const resultado = await this.habitacionesService.habitacionesDisponiblesPorFecha(fechaDesde,fechaHasta)
            res.status(200).json(resultado)
        }catch(error){
            res.status(400).json({error: error.message})
        }
    }
}