const Usuario = require('../modelos/usuario.js')
const RepositorioUsuarios = require('../repository/repositorioUsuarios.js')

module.exports = class UsuariosController {
    constructor(dao){
        this.repositorio = new RepositorioUsuarios(dao)
        this.header = {'content-type': 'application/json'}
        this.body = {}
    }

    crear = (req, res) => {
        let body = this.body
        res.set(this.header)
        if(req.body.nombre && req.body.apellido && req.body.dni){
            try{
                let usuario = new Usuario("", req.body.nombre, req.body.apellido, req.body.dni)
                this.repositorio.guardar(usuario)
                res.status(201)
                body = {"Usuario creado": `${JSON.stringify(usuario)}`}
            } catch(error){
                res.status(500)
                body = { "Error 500" : `Problema en el servidor al operar: ${error}.`}
            }
        }else {
            res.status(400)
            body = {"Error 400": `Payload en formato incorrecto.`}
        }
        res.send(body)
    }
}