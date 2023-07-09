const ReservasDAOMongo = require('./reservasDAOMongo')
//const ReservasDAOMem = require('./reservasDAOMem')

module.exports = class ReservasFactory{
    static getStorage(tipo){
        switch(tipo){
            case 'MONGO':
                return new ReservasDAOMongo ();
            case 'MEM':
                //return new ReservasDAOMem();
            default:
                return new ReservasDAOMongo();
        }
    }
}