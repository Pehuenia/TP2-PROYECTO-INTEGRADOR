let chai = require('chai')
let expect = chai.expect
const assert = chai.assert
let utils = require('../utils/utils')
let ReservaBuilder = require('../modelos/reservaBuilder')
let ReservasService = require('../service/reservasService')
let HabitacionesService = require('../service/habitacionesService')

describe('Reservas', function(){
    describe('Cancelación de una reserva', function(){
        describe('Se debe poder cancelar una reserva con al menos 6 días de anticipación',function(){
            it('Dadas dos fechas se espera que la función retorne los días entre ambas', function(){
                const fecha1 = new Date('2023-06-20')
                const fecha2 = new Date('2023-06-22')

                let resultCase1 = utils.diasEntreDosFechas(fecha1,fecha2)

                assert.strictEqual(resultCase1, 2)
            
            })
            /*it('Se debe permitir cancelar la reserva con mas de 6 días de anticipación'){

            }*/
        })

        
        /*it('No debe poder modificarse una reserva pasada'){

        }
        it('No debe poder modificarse el cliente asociado a la reserva'){

        }
        it('Se debe realizar una reserva por perído mayor o igual a 3 días'){

        }
        it('Las reservas deben crearse como activas'){

        }*/
    })
    describe('Creación de una reserva', function(){
        describe('No debe poder realizarse una reserva de una habitación ya reservada en dicho período',function(){
            it('Dados dos rangos de fecha se retorna true si los rangos se suporponen y false en caso contrario', function(){
                const fechaInicioReserva = new Date('2023-06-10')
                const fechaFinReserva = new Date('2023-06-20')

                /*Fechas solapadas*/
                let resultCase1 = utils.rangosDeFechasSolapados(fechaInicioReserva,fechaFinReserva, new Date('2023-06-03'),new Date('2023-06-15'))
                let resultCase2 = utils.rangosDeFechasSolapados(fechaInicioReserva,fechaFinReserva, new Date('2023-06-15'),new Date('2023-06-24'))
                let resultCase3 = utils.rangosDeFechasSolapados(fechaInicioReserva,fechaFinReserva, new Date('2023-06-12'),new Date('2023-06-18'))
                let resultCase4 = utils.rangosDeFechasSolapados(fechaInicioReserva,fechaFinReserva, new Date('2023-06-10'),new Date('2023-06-20'))

                /*Fechas no solapadas*/
                let resultCase5 = utils.rangosDeFechasSolapados(fechaInicioReserva,fechaFinReserva, new Date('2023-06-02'),new Date('2023-06-09'))
                let resultCase6 = utils.rangosDeFechasSolapados(fechaInicioReserva,fechaFinReserva, new Date('2023-06-21'),new Date('2023-06-25'))

                assert.isTrue(resultCase1)
                assert.isTrue(resultCase2)
                assert.isTrue(resultCase3)
                assert.isTrue(resultCase4)
                assert.isFalse(resultCase5)
                assert.isFalse(resultCase6)
            })
            it('Al existir reservas asociadas a una habitación dentro del rango indicado no debe realizarse la reserva', function(){
                const fechaInicioReserva = new Date('2023-06-10')
                const fechaFinReserva = new Date('2023-06-20')
                const reservaARealizar = new ReservaBuilder();
                reservaARealizar.setId(4).setFechaDesde(fechaInicioReserva).setFechaHasta(fechaFinReserva).setClienteId(1).setHabitacionId(1).build()

                const reservasActivasDeLaHabitacion = [
                    {id: 1 , fechaDesde: new Date('2023-05-02'), fechaHasta: new Date('2023-06-02'), habitacionId: 1, clienteId: 2, activa: true, deleted: false},
                    {id: 2 , fechaDesde: new Date('2023-06-03'), fechaHasta: new Date('2023-06-15'), habitacionId: 1, clienteId: 2, activa: true, deleted: false},
                    {id: 3 , fechaDesde: new Date('2023-06-22'), fechaHasta: new Date('2023-07-05'), habitacionId: 1, clienteId: 2, activa: true, deleted: false}
                ]

                const reservasService = new ReservasService()
                const reservaValida = reservasService.reservaValida(reservaARealizar, reservasActivasDeLaHabitacion)

                assert.isFalse(reservaValida)
            })
            it('Al existir reservas asociadas a una habitación fuera del rango indicado se debe realizarse la reserva', function(){
                const fechaInicioReserva = new Date('2023-06-10')
                const fechaFinReserva = new Date('2023-06-20')
                const reservaARealizar = new ReservaBuilder();
                reservaARealizar.setId(4).setFechaDesde(fechaInicioReserva).setFechaHasta(fechaFinReserva).setClienteId(1).setHabitacionId(1).build()

                const reservasActivasDeLaHabitacion = [
                    {id: 1 , fechaDesde: new Date('2023-05-02'), fechaHasta: new Date('2023-06-02'), habitacionId: 1, clienteId: 2, activa: true, deleted: false},
                    {id: 2 , fechaDesde: new Date('2023-08-03'), fechaHasta: new Date('2023-08-15'), habitacionId: 1, clienteId: 2, activa: true, deleted: false},
                    {id: 3 , fechaDesde: new Date('2023-06-22'), fechaHasta: new Date('2023-07-05'), habitacionId: 1, clienteId: 2, activa: true, deleted: false}
                ]

                const reservasService = new ReservasService()
                const reservaValida = reservasService.reservaValida(reservaARealizar, reservasActivasDeLaHabitacion)

                assert.isTrue(reservaValida)
            })
        })
    })
})

describe('Habitaciones',function(){
    const habitacionesService = new HabitacionesService()
    describe('Busqueda de habitaciones',function(){
        
        it('Al filtrar por fecha deberán mostrarse solo las habitaciones disponibles en el rango enviado', function(){
            const fechaDesde = new Date('2023-06-10')
            const fechaHasta = new Date('2023-06-20')
            //dISPONIBLES 3,2,6
            const habitaciones = [
                {id:1, tipo:'Standard', piso: 2, depto: "A", capacidad: 2, precio: 2300},
                {id:2, tipo:'Standard', piso: 2, depto: "B", capacidad: 2, precio: 2300},
                {id:3, tipo:'Standard', piso: 2, depto: "C", capacidad: 2, precio: 2300},
                {id:4, tipo:'Premium', piso: 3, depto: "A", capacidad: 4, precio: 5200},
                {id:5, tipo:'Premium', piso: 3, depto: "B", capacidad: 4, precio: 5200},
                {id:6, tipo:'Premium', piso: 4, depto: "A", capacidad: 6, precio: 9740},
                {id:7, tipo:'Premium', piso: 5, depto: "A", capacidad: 6, precio: 9960}
            ]

            const reservasActivas = [
                {id: 1 , fechaDesde: new Date('2023-06-03'), fechaHasta: new Date('2023-06-15'), habitacionId: 5, clienteId: 2, activa: true, deleted: false},
                {id: 2 , fechaDesde: new Date('2023-06-02'), fechaHasta: new Date('2023-06-10'), habitacionId: 3, clienteId: 1, activa: true, deleted: false},
                {id: 3 , fechaDesde: new Date('2023-06-15'), fechaHasta: new Date('2023-08-24'), habitacionId: 1, clienteId: 1, activa: true, deleted: false},
                {id: 4 , fechaDesde: new Date('2023-06-21'), fechaHasta: new Date('2023-08-25'), habitacionId: 2, clienteId: 1, activa: true, deleted: false},
                {id: 4 , fechaDesde: new Date('2023-06-12'), fechaHasta: new Date('2023-07-18'), habitacionId: 4, clienteId: 9, activa: true, deleted: false},
                {id: 5 , fechaDesde: new Date('2023-06-10'), fechaHasta: new Date('2023-07-20'), habitacionId: 7, clienteId: 6, activa: true, deleted: false}
            ]
                
            const habitacionesDisponibles = habitacionesService.habitacionesDisponibles(fechaDesde,fechaHasta,habitaciones,reservasActivas)

            const habitacionesEsperadas = [
                {id:2, tipo:'Standard', piso: 2, depto: "B", capacidad: 2, precio: 2300},
                {id:3, tipo:'Standard', piso: 2, depto: "C", capacidad: 2, precio: 2300},
                {id:6, tipo:'Premium', piso: 4, depto: "A", capacidad: 6, precio: 9740}
            ]

            assert.deepEqual(habitacionesDisponibles, habitacionesEsperadas)
        })
        /*it('No debe poder eliminarse una habitación si posee reservas activas')
        it('Filtar por cliente')*/
    })
})