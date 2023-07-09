const Reserva = require('../Modelos/reserva')

module.exports = class ReservaBuilder {
    constructor() {
        this.reserva = null;
        this.id = null;
        this.fechaDesde = null;
        this.fechaHasta = null;
        this.habitacionId = null;
        this.clienteId = null;
        this.facturaId = null;
    }

    setId(id){
        this.id = id;
        return this;
    }

    setFechaDesde(fechaDesde){
        this.fechaDesde = fechaDesde;
        return this;
    }

    setFechaHasta(fechaHasta){
        this.fechaHasta = fechaHasta;
        return this;
    }

    setHabitacionId(habitacionId){
        this.habitacionId = habitacionId;
        return this;
    }

    setClienteId(clienteId){
        this.clienteId = clienteId;
        return this;
    }

    setFacturaId(facturaId){
        this.facturaId = facturaId;
        return this;
    }

    build(){
        this.reserva = new Reserva(
            this.id,
            this.fechDesde,
            this.fechaHasta,
            this.habitacionId,
            this.clienteId,
            this.facturaId
        )

        return this.reserva;
    }
}