const TipoHabitacion = Object.freeze({
    JUNIOR: 1,
    SUITE: 1.5,
    PRESIDENCIAL: 2
});

const TamanioHabitacion = Object.freeze({
SENCILLA: 1,
DOBLE: 1.2,
MATRIMONIAL: 1.5
});

const precioBase = 100;

class Habitacion {
    constructor(tipo, tamanio, capacidad, estaReservada=false, precio) {
        if (!TipoHabitacion.hasOwnProperty(tipo)) {
            throw new Error("Tipo de habitación inválido");
        }
        if (!TamanioHabitacion.hasOwnProperty(tamanio)) {
        throw new Error("Tamaño de habitación inválido");
        }
        this.id = id;
        this.tipo = tipo;
        this.tamanio = tamanio;
        this.capacidad = capacidad;
        this.estaReservada = estaReservada;
        this.precio = precio;
    }

    calcularPrecio() {
        let factorTipo = TipoHabitacion[this.tipo];
        let factorTamanio = TamanioHabitacion[this.tamanio];
        let precioFinal = precioBase * factorTipo * factorTamanio;
        return precioFinal;
    }

    cambiarReserva() {
    this.estaReservada = !this.estaReservada;
    }
}
