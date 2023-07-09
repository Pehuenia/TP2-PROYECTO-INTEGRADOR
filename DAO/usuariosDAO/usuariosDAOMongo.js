const MongoDBConnection = require('../../config/mongodbConnection.js')
const mongo = require('mongodb')

module.exports = class UsuariosDAOMongo {

  constructor() {
    this.collection = MongoDBConnection.getInstance().getDb().collection('usuarios')
  }

  obtenerTodos = async () => {
    const result = await this.collection.find({}).toArray();
    console.log("RESULT --> ",result)
    return result
  }

  // OBTENER 1 USUARIO
  obtenerPorId = async (id) => {
    const result = await this.collection.findOne({ _id: new mongo.ObjectId(id) });
    return result;
  }

  obtenerUsuarioPorDni = async (dni) => {
    const result = await this.collection.findOne({ dni: dni});
    return result;
  }

  async crearUsuario(usuario) {
    const result = await this.collection.insertOne(usuario);
    console.log("RESULT --> ", result);
    return result;
  }


  async eliminarUsuarioPorId(id) {
    const result = await this.collection.deleteOne({ _id: new mongo.ObjectId(id) }, {$set : {deleted: false}})
    console.log("RESULT --> ", result);
    return result;
  }

  async actualizarUsuario(id, usuario) {
    const result = await this.collection.updateOne({ _id: new mongo.ObjectId(id)},{ $set : usuario})
    console.log("RESULT --> ", result);
    return result;
  }
}