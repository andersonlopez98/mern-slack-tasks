//Archivo para que arranque toda la interfaz
// alert('react ira aqui');
import React from 'react'; //importando react // trayendo directamente componente
import {render} from 'react-dom'; // importando react-dom // trayendo directamente el metodo render
import {createRoot} from 'react-dom/client';

import App from './Components/App'

// const rootElement = document.getElementById("root");
// const root = createRoot(rootElement);

render(<App/>, document.getElementById('app'));  //Rendereizando por pantalla, e ira montado el componenteroot.