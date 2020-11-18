const express =require('express');
const planta = express.Router();

const mysqlConnection = require ('../db/database');

planta.get('/planta', (req, res) => {
     

  mysqlConnection.query('SELECT * FROM planta ', (err, rows, fields) => {
      if (!err) {
        res.json(rows);
      } else {
        console.log(err);
      }
    });
 });


 
planta.post('/nueva-planta',(req,res)=>{

const {idPlanta, cuidado, estado, clima, tamaño, categoria, idAlarma, idUsuario} = req.body;

let plantaN = [idPlanta, cuidado, estado, clima, tamaño, categoria, idAlarma, idUsuario];

let nuevaPlanta = `INSERT INTO usuario (idPlanta, cuidado, estado, clima, tamaño, categoria, idAlarma, idUsuario)
                  VALUES(?,?,?,?,?,?,?,?)`;
mysqlConnection.query(nuevaPlanta, plantaN, (err, results, fields) => {
  if (err) {
    return console.error(err.message);
  }
  res.json({ message:`Nueva Planta`, })
  });
}); 








module.exports = planta;