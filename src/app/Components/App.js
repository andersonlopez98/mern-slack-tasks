import React, {Component} from 'react'; //importando react // trayendo directamente componente

class  App extends Component { //Creaando componente App

    constructor() {
        super(); //heredando funcionalidades del componente de react
        this.state = {  //esta de la aplicacion
            title: '',  //estado del titulo en blanco cuando empiece la aplicacion (esto es una propiedad)
            description: '', // estado de la description en blanco cuando empiece la aplicacion
            tasks: [], // cuando empiece la aplicacion estar en blanco
            _id: '',
            // button: 'Enviar'


        };
        this.handleChange = this.handleChange.bind(this);
        this.addTask = this.addTask.bind(this); // Agregando el metodo
    }

    addTask(e){
        if (this.state._id) { //desde el estado estoy obteniendo un _id, vamos a actulizar algo
            fetch(`/api/tasks/${this.state._id}` , { //peticion put pasando el id
                method: 'PUT', //actulizar
                body :JSON.stringify(this.state),
                headers: {      //cabeceras, que tipo de datos voy enviar
                    'Accept': 'application/json', //el tipo de contenido de tipo json
                    'Content-Type': 'application/json' //tipo de contenido que voy a enviar
                }
            })
            .then(res => res.json())
            .then(data => {  //Agregando otro tipo de funcionalidad
                console.log(data)
                M.toast({html: 'Tarea Actulizada'}) // Utilizando funcionalidad de materialize, usando ventana llamada toas (M -> variable global de materialize)
                this.setState({title: '', description: '', _id:''}) //limpiamos el formulario para que quede en blanco// como el _id esta vacio se encargara de agregar una nueva tarea
                this.fetchTask(); // pide las tareas nuevamente del servidor y actuliza la aplicacion
             })

        }else {//de lo contrario
            //console.log(this.state); //capturando los datos simplemente atraves del estado
            //validarFormulario();

            fetch('/api/tasks',{ //fetch propio evento del navegador llamado fetch, (fetch)->es para poder enviar una peticion http a mi servidor

            method: 'POST', //haciendo peticion atraves de un metodo
            body: JSON.stringify(this.state),// enviando un cuerpo es un string - convirtiendo con JSON.stringify  un objeto a un string - conv
            headers: {      //cabeceras, que tipo de datos voy envar
                'Accept': 'application/json', //el tipo de contenido de tipo json
                'Content-Type': 'application/json' //tipo de contenido que voy a enviar
            }

        })
             //.then(res => console.log(res)) //cunadno el servidor lo reciba va a responder algo la respuesta
             .then(res => res.json()) //respuesta en formato json
             //.then(data => console.log(data)) // obteniendo los datos por consola
             .then(data => {  //Agregando otro tipo de funcionalidad
                console.log(data)
                M.toast({html: 'Tarea Guardada'}) // Utilizando funcionalidad de materialize, usando ventana llamada toas (M -> variable global de materialize)
                this.setState({title: '', description: ''}) //limpiamos el formulario para que quede en blanco
                this.fetchTask(); // pide las tareas nuevamente del servidor y actuliza la aplicacion
             })
             .catch(err => console.error(err)) //capturando el error
        }

        e.preventDefault(); //Evitando que el metodo de envio se refresque
    }

    componentDidMount() {  // evento // apenas la aplicacion este montada
        //console.log('componente fue montado');
        this.fetchTask(); //Ejecutando el metodo de fetchTask
    }

    fetchTask(){  //metodo Obtener tareas
        fetch('/api/tasks')  //Consulta al servidor con fetch //consulta de tipo get (por defecto con fetch hace una peticion get)
            .then (res => res.json()) // respuesta del servidor//convirtiendo a un json
            //.then(data => console.log(data));//mostrando por consola
            .then(data => {
                //console.log(data);
                this.setState({tasks:data}); //cargando y llenando task con los datos del servidor
                console.log(this.state.tasks) //mostrando por consola el estado de las tareas
            });
    }

    deleteTask(id){  //obtenienndo el parametro de id
        //console.log('eliminando: '+ id); //concatenando que id estoy eliminando
        if (confirm('estas seguro de querer eliminar el elemento')){  //agregando condicion atreaves de confirm que es propio de los navegadores
            fetch(`/api/tasks/${id}`, {  //haciento peticion al servidor (nueva manera de concatenar en js)
                method: 'DELETE',//enviaando el metodo delete
                headers: {      //cabeceras, que tipo de datos voy envar
                    'Accept': 'application/json', //el tipo de contenido de tipo json
                    'Content-Type': 'application/json' //tipo de contenido que voy a enviar
                }
            })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                M.toast({html: 'Tarea Eliminada'});  //mensaje atraves de materialize
                this.fetchTask(); //volver a tener los datos
            });
        }

    }

    editarTask(id) {
        fetch(`/api/tasks/${id}`)  //consulta al servidor
            .then(res => res.json())
            //.then(data => console.log(data)) ///mostrando por consola lo que he obtenido
            .then(data => {
                this.setState({  //actualizar el estado de la aplicacion
                    title: data.title,
                    description: data.description,
                    _id : data._id // id por defalut esta en blanco // cada ves que actualizamos estamos utilzando la propiedad _id, ya que estamos editando tambien estamos llenando ese _id
                })
            }) ;


    }

    handleChange(e){ //evento // cada que el usuario escribe algo este evento lo va a capturar
        const {name, value} = e.target; //Desde el input solo se requiere el nombre y el valor (e.target -> me da los valores del elemento)
        this.setState({  //cambiar el estado de una aplicacion de react
            [name]: value  //cambiando el valor del nombre ya que se inicializa en '' ->vacio
        });
    }


    render() {
        return (

            <>
            <div>
                {/* {NAVEGACION} */}
                <nav className="light-blue darken-4">
                    <div className="container">
                        <a className="brand-logo" href="/"> Mern Stack - Anderson Lopez</a>
                    </div>
                </nav>
                <div className="container">
                    <div className="row">
                        <div className="col s5">
                            <div className="card">
                                <div className="card-content">
                                    <form onSubmit={this.addTask}>
                                         <div className="row">
                                            <div className="input-field col s12">
                                                <input name="title" onChange={this.handleChange} type="text" placeholder="Titulo de la tarea" value={this.state.title}  required ></input>

                                            </div>

                                         </div>

                                         <div className="row">
                                            <div className="input-field col s12">
                                                <textarea name="description" onChange={this.handleChange} placeholder="Descripcion de la tarea" className="materialize-textarea" value={this.state.description} required> </textarea>

                                            </div>

                                         </div>
                                         <button type="submit" className="btn light-blue darken-4">
                                            {/* {this.state.button} */}
                                            Enviar
                                         </button>

                                    </form>
                                </div>

                            </div>

                        </div>

                        <div className="col s7">
                            <table>
                                <thead>
                                    <tr>
                                        <th>Titulos</th>
                                        <th>Descripcion</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        this.state.tasks.map(task => { //desde el estado de las task las voy a recorrer con map y //renderizando un elemento
                                          return (//propiedad unica llama key, por lo general se le agrega el id
                                            <tr key={task._id}>
                                                <td>{task.title}</td>
                                                <td>{task.description}</td>
                                                <td>
                                                    {/* Agregando funcion flecha para ejecutar el evento deleteTask dandole el parametro del ID */}
                                                    <button className="btn light-blue darken-4" onClick={()=> this.deleteTask(task._id)}>
                                                        <i className="material-icons">delete</i>
                                                    </button>
                                                    <button onClick={()=> this.editarTask(task._id)} className="btn light-blue darken-4" style={{margin: '4px'}} >
                                                        <i className="material-icons">edit</i>
                                                    </button>

                                                </td>

                                            </tr>
                                          )
                                        })
                                    }
                                </tbody>
                            </table>

                        </div>

                    </div>
                </div>
            </div>
            </>
        )

    }

}

export default App;