const UsuariosDAOMongo = require('./usuariosDAOMongo')
// const UsuariosDAOMem = require('./usuariosDAOMem')

module.exports = class UsuariosFactory{
    static getStorage(tipo) {
        switch(tipo) {
            case 'MONGO' :
                return new UsuariosDAOMongo()
            case 'MEM' :
                // return new UsuariosDAOMem()
            default: 
                return new UsuariosDAOMongo()
        }
    }
}