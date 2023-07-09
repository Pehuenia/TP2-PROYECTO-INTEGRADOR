const { MongoClient } = require('mongodb')
// Connection URL
const url = 'mongodb+srv://root:root@reserva-habitaciones.cstlzgt.mongodb.net/?retryWrites=true&w=majority'
// Database Name
const dbName = 'reservas-hotel';

let mongoDBDaoInstance = null;
module.exports = class MongoDBConnection {

  /*static mongoDBDaoInstance = null;*/
  
  constructor() {
    this.db = null;
    this.client = new MongoClient(url)
    this.conectar()
  }

  static getInstance() {
    if(!mongoDBDaoInstance){
      mongoDBDaoInstance = new MongoDBConnection 
    }

    return mongoDBDaoInstance
  }

  getDb(){
    return this.db
  }

  conectar() {
    try {
      this.client.connect()
    } catch (e) {
      console.log("No se pudo conectar a MongoDB")
    }

    this.db = this.client.db(dbName)
  }

  
}