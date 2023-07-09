module.exports = class Usuario {
    constructor(rol, dni, nombre, apellido, mail, telefono, localidad, password) {
        this.rol = rol;
        this.dni = dni;
        this.nombre = nombre;
        this.apellido = apellido;
        this.mail = mail;
        this.telefono = telefono;
        this.localidad = localidad;
        this.password = password;
    }
}