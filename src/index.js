//archivo de express para arrancar el servidor
const express = require('express'); // llamando el modulo llamado express
const morgan = require('morgan');
const path = require('path'); //este modulo de encargar de unir directorios (windows, linux)


const { mongoose } = require('./database'); //trayendo modulo mongoose

const app = express();  // aqui ejecuto el modulo

//Configuraciones
app.set('port', process.env.PORT || 3000); // Sirve para el despliegue en  la nube

//(Middlewares)funciones  que se ejecutan antes de que lleguen a las rutas
app.use(morgan('dev'));  //veremos los mensajes con un formateado de texto (en consola) usando el modulo morgan
app.use(express.json());// utilizando el metodo json desde express // Cada ves que llegue un dato esta funcion, comprueba si el dato es un json para asi poder acceder y enviar  desde nuestro servidor


// Rutas o urls del servidot
app.use('/api/tasks',require('./routes/task.routes'));

// Static files
app.use(express.static(path.join(__dirname,'public')));// fijando carpeta public//cada ves que entren al servidor veran el index que esta en la carpeta
//console.log(path.join(__dirname,'public'));

//Iniciando el servidor
app.listen(app.get('port'), () =>{ //servidor ejecuta en el puerto con el puerto ya definido en configuracion
    console.log(`Server on port ${app.get('port')}`); //  //ejecutando una tarea

});