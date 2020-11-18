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





module.exports = usuario;