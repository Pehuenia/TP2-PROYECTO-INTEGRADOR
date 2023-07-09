module.exports = class Reserva {
    constructor(id, fechaDesde, fechaHasta, habitacionId, clienteId, facturaId) {
        this.id = id;
        this.fechaDesde = fechaDesde;
        this.fechaHasta = fechaHasta;
        this.habitacionId = habitacionId;
        this.clienteId = clienteId;
        this.facturaId = facturaId;
        this.activa = true;
        this.deleted = false;
    }
 
}