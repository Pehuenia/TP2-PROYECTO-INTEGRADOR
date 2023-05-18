# Reserva de habitaciones

## Introducción

El proyecto consiste en desarrollar un sistema de reserva de habitaciones en línea para un hotel. El sistema permitirá a los usuarios reservar habitaciones de forma segura y fácil desde cualquier lugar con conexión a Internet. Los usuarios podrán ver las habitaciones disponibles, seleccionar la que deseen, proporcionar su información de contacto y realizar los pagos correspondientes. 

## Descripción

En la actualidad, el Hotel FJM dispone de un sistema de registro de reservas manual. Las reservas pueden realizarse de manera presencial, telefónica y vía mail.
En busca de un mayor alcance para captar a su público objetivo, nos solicitan la elaboración de una aplicación en línea  para realizar reservas.


## UML

![UML](https://github.com/Pehuenia/TP2-PROYECTO-INTEGRADOR/assets/69096087/890ed958-39b1-48e4-b33e-828528c3f8b8)

## Reglas de negocio
### Reglas de reserva de habitaciones:
* Los usuarios deben seleccionar una habitación y una fecha de arribo.
* Los usuarios deben abonar una cantidad parcial o el total para confirmar su reserva: a partir del 50% del total a abonar.
* Las reservas sólo pueden pagarse con una tarjeta de crédito o débito válida.
* Se permite la modificación(según disponibilidad) o cancelación de la reserva hasta seis días antes de la fecha del check-in para poder * recibir el reembolso del depósito inicial.
* En caso de cancelación, si la misma se realiza con una antelación de seis días o superior, se reembolsará al usuario el reembolso del total abonado. 
* Si la antelación fuera menor a seis días, al usuario se le reembolsará un 10% del total abonado por cada día de antelación.
* En caso de no presentarse el día de la reserva, la misma se dará por cancelada sin reembolso posible. 

### Reglas de ingreso al hotel:
* Los usuarios deben realizar el check-in para su reserva desde la app antes del ingreso.
* La reserva es válida hasta la fecha previamente solicitada.
* Para realizar el ingreso debe encontrarse presente el titular de la reserva.

