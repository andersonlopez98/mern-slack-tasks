//Diseñar el esquema de los datos
const mongoose = require('mongoose'); // se necesita para modelar los datos
const { Schema } = mongoose; // define el esquema de los datos

const TaskSchema = new Schema ({ //esquema de las tareas
    title : { type: String, required: true}, //definiendo propiedad
    description : { type: String, required: true}
})

module.exports = mongoose.model('Task', TaskSchema); //definiendo Modelo de datos y estructura