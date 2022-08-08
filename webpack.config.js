module.exports = {
    entry: './src/app/index.js', // archivo inicial (entrada de webpack)
    output:{     //Donde va a colocar el codigo convertido
        
        path: __dirname + '/src/public', //ruta absoluta (rutainicial + donde va a colocar el codigo)
        filename: 'bundle.js'   //nombre del archivo convertido y compactado

    },
    module: {   //propiedad 
        rules : [   // propiedad llamada rules
            {      //cada objeto es una configuracion adicional al webpack
                use : 'babel-loader', //utilizando babel-loader (sirve para traducir el codigo)
                test : /\.js$/, //Tomando todos los archivos js
                exclude : /node_modules/ //archivos que no debe de tomar
            }
        ]
    }
};