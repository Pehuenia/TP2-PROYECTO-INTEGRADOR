const express = require('express')
const UsuariosController = require('../controller/usuariosController.js')

module.exports = class UsuariosRouter {
    constructor(){
        this.router = express.Router()
        this.usuariosController = new UsuariosController()
    }

    start(){
        this.router.get('/:id?', this.usuariosController.obtenerUsuarios)
        this.router.post('/', this.usuariosController.crearUsuario),
        this.router.put('/:id?', this.usuariosController.actualizarUsuario)
        this.router.delete('/:id?', this.usuariosController.eliminarUsuario)
        return this.router
    }
}