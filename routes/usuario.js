const express =require('express');
const usuario = express.Router();

const mysqlConnection = require ('../db/database');



usuario.get('/usuario', (req, res) => {
  
  mysqlConnection.query('SELECT * FROM usuario ', (err, rows, fields) => {
      if (!err) {
        res.json(rows);
      } else {
        console.log(err);
      }
    });
 });



usuario.post('/nuevo-usuario',(req,res)=>{

const {usuario, contraseña} = req.body;

let usuarioN = [usuario, contraseña];

let nuevoUsuario = `INSERT INTO usuario (usuario, contraseña)
                  VALUES(?,?)`;
mysqlConnection.query(nuevoUsuario, usuarioN, (err, results, fields) => {
  if (err) {
    return console.error(err.message);
  }
  res.json({ message:`Nuevo Usuario`, })
  });
}); 



usuario.put('/usuario/:id', (req, res) => {
  const {usuario, contraseña} = req.body;
  const { id_usuario } = req.params;
  mysqlConnection.query(`UPDATE usuario SET usuario = ?, contraseña = ?`,
  [usuario, contraseña], (err, rows, fields) => {
    if(!err) {
      res.json({status: 'Usuario actualizado'});
    } else {
      console.log(err);
    }
  });
});


usuario.delete('/usuario/:id_usuario', (req, res) => {
  const { id_usuario } = req.params;
  mysqlConnection.query('DELETE FROM usuario WHERE id_usuario = ?',
   [id_usuario], (err, rows, fields) => {
    if(!err) {
      res.json({status: 'Usuario eliminado'});
    } else {
      console.log(err);
    }
  });
});





module.exports = usuario;