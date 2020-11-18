const express = require('express');
const app = express();
const alarma = require('./routes/alarma');
const foro = require('./routes/foro');
const planta = require('./routes/planta');
const usuario = require('./routes/usuario');
const publicacion = require('./routes/publicacion');

// Ajustes
app.set('port',3000);
app.set('json spaces',2);

// Middlewares
app.use(express.json());

//Routes
app.use('/api', alarma);
app.use('/api', foro);
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