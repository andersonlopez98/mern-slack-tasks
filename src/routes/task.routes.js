//Definir operacion atraves de las urls
const express = require('express'); // llamando el modulo llamado express
const router = express.Router(); //metodo llamado router// paara poder igresar rutas

const Task = require('../models/task'); //Trayendo el modelo de BD


router.get('/', async (req, res) => { //definir rutas de mi servidor
    
    const tasks = await Task.find() //await dice que la tarea va a tomar algo de tiempo 
    console.log(tasks);
    res.json(tasks);
}); 

router.get('/:id', async (req, res) => {
    const task = await Task.findById(req.params.id);// obteniendo solo una unica tarea
    res.json(task);


})

router.post('/', async (req, res) => { //ruta para agregar tareas
    const { title , description } = req.body; // obtener los datos
    const task = new Task({title, description}) // creando nueva tarea
    await task.save(); //alamcenando en la bd
    res.json({status: 'Tarea Guardada'}) // respuesta ok
})

router.put('/:id', async (req, res) => {
    const { title, description } = req.body; //
    const newTask = { title, description}; //
    await Task.findByIdAndUpdate(req.params.id, newTask) // Actualiza
    //console.log(req.params.id);//obteniendo el id del cliente
    res.json({status: 'Tarea Actualizada' });
})

router.delete('/:id', async (req, res) => {
    await Task.findByIdAndDelete(req.params.id)//Traemos solo el parametro para eliminar
    res.json({status: 'Tarea Eliminada' });

})

module.exports = router; //