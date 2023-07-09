// class UsuariosMemDAO {

//     constructor() {
//         // rol, dni, nombre, apellido, mail, telefono, domicilio, password
//         this.usuarios = [
//             { id: '1', rol:'regular', nombre: 'Francisco', apellido:'Pols', mail:'franPols@test.com', telefono: '92382674', localidad: 'CABA' },
//             { id: '2', rol:'regular', nombre: 'Candela', apellido:'Pols', mail:'candPols@test.com', telefono: '63982674', localidad: 'CABA' },
//             { id: '3', rol:'admin', nombre: 'Mirta', apellido:'Xiao', mail:'mirtax@test.com', telefono: '12378129', localidad: 'CABA' },
//         ]
//     }

//     findUsuario = async id => {
//         return this.usuarios.find(usuario => usuario.id == id)    
//     }

//     findUsuarios = async ()  => {
//         try {
//             return this.usuarios
//         }
//         catch {
//             return []
//         }
//     }

//     saveUsuario = async usuario => {

//         const id = parseInt(this.usuarios[this.usuarios.length-1].id) + 1
//         usuario.id = String(id)

//         this.usuarios.push(usuario)

//         return {status: 'OK'}    
//     }

//     updateUsuario = async (usuario) => { 
        
//         const index = this.usuarios.findIndex(usu => usu.id == usuario.id)
//         this.usuarios.splice(index, 1, usuario)

//         return usuario    
//     }

//     deleteUsuario = async id => {
//         const index = this.usuarios.findIndex(usuario => usuario.id == id)

//         const usuario = this.usuarios.splice(index, 1)[0]
        
//         return usuario    
//     }
// }

// export default UsuariosMemDAO
