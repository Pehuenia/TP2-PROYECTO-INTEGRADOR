const HabitacionesFactory = require('../DAO/habitacionesDAO/habitacionesFactory.js') 

module.exports = class RepositorioHabitaciones {
  constructor() {
    //Se puede obtener de una variable de entorno
    this.storage = HabitacionesFactory.getStorage('MONGO')
  }
  

  async listarHabitaciones(id) {
    let habitaciones = null
    
    if(id != null){
      habitaciones = await this.storage.obtenerPorId(id)
    }else{
      console.log("Repo obtener todas")
      habitaciones = await this.storage.obtenerTodas()
    }
    console.log("Repo", habitaciones)
    return habitaciones;
    
  }

  async buscarPorPisoYDepto(piso,depto){
    return await this.storage.obtenerPorPisoYDepto(piso,depto)
  }

  async crearHabitacion(habitacion){
    return await this.storage.crearHabitacion(habitacion)
  }

  async actualizarHabitacion(id,habitacion){
    return await this.storage.actualizarHabitacion(id,habitacion)
  }

  async eliminarHabitacion(id){
    return await this.storage.eliminarHabitacionPorId(id)
  }
}