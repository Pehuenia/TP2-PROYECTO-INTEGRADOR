const UsuariosFactory = require('../DAO/usuariosDAO/usuariosFactory.js') 

module.exports = class RepositorioUsuarios {
  constructor() {
    this.storage = UsuariosFactory.getStorage('MONGO')
  }
  
  async obtenerUsuarios(id) {
    let usuarios = null

    if(id != null){
      usuarios = await this.storage.obtenerPorId(id)
    }else{
      console.log("Repo obtener usuarios")
      usuarios = await this.storage.obtenerTodos()
    }
    console.log("Repo", usuarios)
    return usuarios;
  }

  async crearUsuario(usuario){
    return await this.storage.crearUsuario(usuario)
  }

  async eliminarUsuario(id){
    return await this.storage.eliminarUsuarioPorId(id)
  }

  async actualizarUsuario(id,usuario){
    return await this.storage.actualizarUsuario(id,usuario)
  }

  async buscarUsuarioPorDni(dni){
    return await this.storage.obtenerUsuarioPorDni(dni)
  }
}
