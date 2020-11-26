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

const { id_foro, id_usuario, publicacion, fecha } = req.body;

let publicacionN = [id_foro, id_usuario, publicacion, fecha];

let nuevaPublicacion = `INSERT INTO publicacion (id_foro, id_usuario, publicacion, fecha)
                  VALUES(?,?,?,?)`;
mysqlConnection.query(nuevaPublicacion, publicacionN, (err, results, fields) => {
  if (err) {
    return console.error(err.message);
  }
  res.json({ message:`Nueva publicacion agregada`, })
  });
}); 



publicacion.put('/publicacion/:id', (req, res) => {
  const { id_foro, id_usuario, publicacion, fecha} = req.body;
  const { id_publicacion } = req.params;
  mysqlConnection.query(`UPDATE publicacion SET id_foro = ?, id_usuario = ?, publicacion = ?, fecha = ?`,
  [id_foro, id_usuario, publicacion, fecha], (err, rows, fields) => {
    if(!err) {
      res.json({status: 'Publicación actualizada'});
    } else {
      console.log(err);
    }
  });
});


publicacion.delete('/publicacion/:id_publicacion', (req, res) => {
  const { id_publicacion } = req.params;
  mysqlConnection.query('DELETE FROM publicacion WHERE id_publicacion = ?',
   [id_publicacion], (err, rows, fields) => {
    if(!err) {
      res.json({status: 'Publicación eliminada'});
    } else {
      console.log(err);
    }
  });
});







module.exports = publicacion;