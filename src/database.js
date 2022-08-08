//conexion a la base de datos para luego utilizarlo en index.js
const mongoose = require('mongoose');

const URI = 'mongodb://127.0.0.1/mern-task'//direccion de la base de datos

mongoose.connect(URI) //conectando...
    .then (db => console.log('DB esta conectada')) //ok
    .catch(err => console.error(err));//error

module.exports = mongoose;