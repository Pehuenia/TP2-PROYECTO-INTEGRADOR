const MongoDBConnection = require('../../config/mongodbConnection.js')
const mongo = require('mongodb')

module.exports = class ReservasDAOMongo {

  constructor() {
    this.collection = MongoDBConnection.getInstance().getDb().collection('reservas')
  }

  obtenerTodasActivas = async () => {
    const result = await this.collection.find({activa: true}).toArray();
    return result
  }

  obtenerPorId = async (id) => {
    const result = await this.collection.findOne({ _id: new mongo.ObjectId(id) });
    return result;
  }

  obtenerPorCliente = async (idCliente) => {
    const result = await this.collection.find({ clienteId: idCliente }).toArray();
    return result;
  }

  obtenerReservasActivasPorHabitacion = async (idHabitacion) => {
    const result = await this.collection.find({activa: true, habitacionId: idHabitacion}).toArray();
    return result;
  }

  /*obtenerReservasPorPerídoTotalOParcial = async (fechaDesde, fechaHasta) => {
    const result = await this.collection.find({ <Field Name>: { $gt:ISODate('Date here') } });
    return result;
  }*/

  async crearReserva(reserva) {
    const result = await this.collection.insertOne(reserva);
    console.log("RESULT --> ", result);
    return result;
  }


  async eliminarReservaPorId(id) {
    //const result = await this.collection.deleteOne({ _id: id });
    const result = await this.collection.update({ _id: new mongo.ObjectId(id) }, {$set : {deleted: false}})
    console.log("RESULT --> ", result);
    return result;
  }

  async actualizarReserva(id, reserva) {
    const result = await this.collection.updateOne({ _id: new mongo.ObjectId(id) }, { $set : reserva})
    console.log("RESULT --> ", result);
    return result;
  }
}  