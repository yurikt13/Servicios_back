const express =require('express');
const publicacion = express.Router();

const mysqlConnection = require ('../db/database');

publicacion.get('/publicacion', (req, res) => {
     

  mysqlConnection.query('SELECT * FROM publicacion ', (err, rows, fields) => {
      if (!err) {
        res.json(rows);
      } else {
        console.log(err);
      }
    });
 });


 
publicacion.post('/nueva-publicacion',(req,res)=>{

const {idPublicacion, idForo, idUsuario, publicacion, fecha} = req.body;

let publicacionN = [idPublicacion, idForo, idUsuario, publicacion, fecha];

let nuevaPublicacion = `INSERT INTO usuario (idPublicacion, idForo, idUsuario, publicacion, fecha)
                  VALUES(?,?,?,?,?)`;
mysqlConnection.query(nuevaPublicacion, publicacionN, (err, results, fields) => {
  if (err) {
    return console.error(err.message);
  }
  res.json({ message:`Nueva Publicacion`, })
  });
}); 








module.exports = publicacion;