const express = require('express');
const cors = require('cors');
const app = express();
const alarma = require('./routes/alarma');
const planta = require('./routes/planta');
const usuario = require('./routes/usuario');
const publicacion = require('./routes/publicacion');

//importante para la conexion del front con el back
//uso de cors
app.use(cors({origin: '*'}))


// Ajustes
app.set('port', process.env.PORT || 4001);
app.set('json spaces',2);

// Middlewares
app.use(express.json());

//Routes
app.use('/api', alarma);
app.use('/api', planta);
app.use('/api', usuario);
app.use('/api', publicacion);


app.get('/',(req,res)=>{
  res.send('Hola a todos - Esta es nuestra de NodeJS - Express y MySql')
});


// Ajustes del servidor
app.listen(app.get('port'), () => {
  console.log(`Servidor corriendo en el puerto ${app.get('port')}`);
}); 