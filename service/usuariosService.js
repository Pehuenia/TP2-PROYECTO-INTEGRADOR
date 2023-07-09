const RepositorioUsuarios =  require('../repository/repositorioUsuarios.js')
const Usuario = require('../modelos/usuario.js');
const Utils = require('../utils/utils.js');

module.exports = class UsuariosService {
    constructor(){
        this.repositorioUsuarios = new RepositorioUsuarios();
    }

    async obtenerUsuarios(id = null) {
        const resultado = await this.repositorioUsuarios.obtenerUsuarios(id);
        return resultado ? resultado : 'No se halló ningun usuario con el id ingresado'
    }

    async crearUsuario(rol, dni, nombre, apellido, mail, telefono, localidad, password){
        const existeUsuario = await this.repositorioUsuarios.buscarUsuarioPorDni(dni);
        if(!existeUsuario){
            const usuario = new Usuario(rol, dni, nombre, apellido, mail, telefono, localidad, password)
            return await this.repositorioUsuarios.crearUsuario(usuario)
        }else{
            throw Error('El usuario ya existe')
        }
    }

    async eliminarUsuario(id){
        const existe = await this.repositorioUsuarios.obtenerUsuarios(id);
        if(existe){
            await this.repositorioUsuarios.eliminarUsuario(id)
        }else{
            throw Error('No se halló ningun usuario con el id ingresado')
        }
    }

    async actualizarUsuario(id,usuario){
        const usuarioExistente = await this.repositorioUsuarios.obtenerUsuarios(id);
        if(usuarioExistente && (usuarioExistente._id != id)){
            throw Error('No puede modificar al usuario porque los datos a actualizar corresponden a otro usuario ingresado')
        }else if(usuarioExistente.dni != usuario.dni){
            throw Error('No puede modificar el dni del usuario')
        }else {
            await this.repositorioUsuarios.actualizarUsuario(id,usuario)
        }
    }
}