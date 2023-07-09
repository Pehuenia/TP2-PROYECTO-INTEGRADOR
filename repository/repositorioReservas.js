const ReservasFactory = require('../DAO/reservasDAO/reservasFactory') 

module.exports = class RepositorioReservas {
  constructor() {
    //Se puede obtener de una variable de entorno
    this.storage = ReservasFactory.getStorage('MONGO')
  }
  

  async listarReservas(id) {
    let reservas = null
    
    if(id != null){
      reservas = await this.storage.obtenerPorId(id)
    }else{
      reservas = await this.storage.obtenerTodasActivas()
    }
    
    return reservas;
    
  }

  async listarReservasPorCliente(id) {
    return await this.storage.obtenerPorCliente(id)
  }

  async listarReservasActivasPorHabitacion(id) {
    return await this.storage.obtenerReservasActivasPorHabitacion(id)
  }

  async crearReserva(reserva){
    return await this.storage.crearReserva(reserva)
  }

  async actualizarReserva(id,reserva){
    return await this.storage.actualizarReserva(id, reserva)
  }

  async eliminarReserva(id){
    return await this.storage.eliminarReservaPorId(id)
  }
}