const HabitacionesRouter = require('./router/habitacionesRouter')
const ReservasRouter = require('./router/reservasRouter')
const UsuariosRouter = require('./router/UsuariosRouter')

const bodyParser = require('body-parser')
const express = require('express')


const port = 3000
//Set express
const app = express()
app.set('title','Hotel')
// Parseo de request body
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))
// Default header
header_json = {"content-type":"application/json"}

const BASE_PATH = '/reservahoteles.ort/v1'

app.use(BASE_PATH + '/habitaciones', new HabitacionesRouter().start())
app.use(BASE_PATH + '/reservas', new ReservasRouter().start())
app.use(BASE_PATH + '/usuarios', new UsuariosRouter().start())

app.listen(port, () => {
    console.log(`Nuestro server está funcionando bien en el port ${port}`)
})