const UsuariosService  =  require('../service/usuariosService.js')

module.exports = class UsuariosController {

    constructor() {
        this.usuariosService = new UsuariosService()
    }

    obtenerUsuarios = async (req,res) => {
        let { id } = req.params
        res.json( await this.usuariosService.obtenerUsuarios(id) )
    }

    crearUsuario = async (req,res) => {
        let usuario = req.body;
        try{
            const resultado = await this.usuariosService.crearUsuario(
                usuario.rol,
                usuario.dni,
                usuario.nombre,
                usuario.apellido,
                usuario.mail,
                usuario.telefono,
                usuario.localidad,
                usuario.password
            )
            res.status(201).json(resultado)
        }catch(error){
            res.status(400).json({error: error.message})
        }
    }

    actualizarUsuario = async (req,res) => {
        let { id } = req.params;
        let usuario = req.body;
        try{
            const resultado = await this.usuariosService.actualizarUsuario(id,usuario)
            res.status(200).json(resultado)
        }catch(error){
            res.status(400).json({error: error.message})
        }
    }

    eliminarUsuario = async (req,res) => {
        let { id } = req.params
        try{
            const resultado = await this.usuariosService.eliminarUsuario(id)
            res.status(200).json(resultado)
        }catch(error){
            res.status(400).json({error: error.message})
        }
    }
}