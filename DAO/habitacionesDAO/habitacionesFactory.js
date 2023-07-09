const HabitacionesDAOMongo = require('./habitacionesDAOMongo')
//const HabitacionesDAOMem = require('./habitacionesDAOMem')

module.exports = class HabitacionesFactory{
    static getStorage(tipo){
        switch(tipo){
            case 'MONGO':
                return new HabitacionesDAOMongo();
            case 'MEM':
                //return new HabitacionesDAOMem();
            default:
                return new HabitacionesDAOMongo();
        }
    }
}