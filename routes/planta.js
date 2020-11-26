const express = require('express');
const planta = express.Router();

const mysqlConnection = require('../db/database');


planta.get('/planta', (req, res) => {
  mysqlConnection.query('SELECT * FROM planta ', (err, rows, fields) => {
    if (!err) {
      res.json(rows);
    } else {
      console.log(err);
    }
  });
});



planta.post('/nueva-planta', (req, res) => {
  const { cuidado, estado, clima, tamaño, categoria, id_usuario, nomplanta } = req.body;
  let plantaN = [cuidado, estado, clima, tamaño, categoria, id_usuario, nomplanta];
  let nuevaPlanta = `INSERT INTO planta (cuidado, estado, clima, tamaño, categoria, id_usuario, nomplanta)
                  VALUES(?,?,?,?,?,?,?)`;
  mysqlConnection.query(nuevaPlanta, plantaN, (err, results, fields) => {
    if (err) {
      return console.error(err.message);
    }
    res.json({ message: `Nueva planta agregada`, })
  });
});


planta.put('/planta/:id', (req, res) => {
  const { cuidado, estado, clima, tamaño, categoria, id_usuario, nomplanta } = req.body;
  const { id_planta } = req.params;
  mysqlConnection.query(`UPDATE planta SET cuidado = ?, estado = ?, clima = ?, tamaño = ?, categoria = ?, id_usuario = ?, nomplanta = ? `,
    [cuidado, estado, clima, tamaño, categoria, id_usuario, nomplanta], (err, rows, fields) => {
      if (!err) {
        res.json({ status: 'Informacion actualizada' });
      } else {
        console.log(err);
      }
    });
});

planta.delete('/planta/:id_planta', (req, res) => {
  const { id_planta } = req.params;
  mysqlConnection.query('DELETE FROM planta WHERE id_planta = ?',
    [id_planta], (err, rows, fields) => {
      if (!err) {
        res.json({ status: 'Planta eliminada' });
      } else {
        console.log(err);
      }
    });
});

module.exports = planta;