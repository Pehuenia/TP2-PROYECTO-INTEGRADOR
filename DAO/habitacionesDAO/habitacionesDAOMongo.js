const MongoDBConnection = require('../../config/mongodbConnection.js')
const mongo = require('mongodb')

module.exports = class HabitacionesDAOMongo {

  constructor() {
    this.collection = MongoDBConnection.getInstance().getDb().collection('habitaciones')
  }

  obtenerTodas = async () => {
    const result = await this.collection.find({}).toArray();
    return result
  }

  obtenerPorId = async (id) => {
    const result = await this.collection.findOne({ _id: new mongo.ObjectId(id)});
    return result;
  }

  obtenerPorPisoYDepto = async (piso,depto) => {
    const result = await this.collection.findOne({ piso: piso , depto: depto});
    return result;
  }

  obtenerTodaLasHabitacionesExcepto = async (listIds) => {
    const result = await this.collection.find({ _id: { $nin: listIds }});
    return result;
  }

  async crearHabitacion(habitacion) {
    const result = await this.collection.insertOne(habitacion);
    console.log("RESULT --> ", result);
    return result;
  }


  async eliminarHabitacionPorId(id) {
    const result = await this.collection.deleteOne({ _id: new mongo.ObjectId(id)});
    console.log("RESULT --> ", result);
    return result;
  }

  async actualizarHabitacion(id, habitacion) {
    const result = await this.collection.updateOne({ _id: new mongo.ObjectId(id)},{ $set : habitacion})
    console.log("RESULT --> ", result);
    return result;
  }
}