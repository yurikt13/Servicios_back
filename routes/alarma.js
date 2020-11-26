const express = require('express');
const alarma = express.Router();

const mysqlConnection = require('../db/database');


alarma.get('/alarma', (req, res) => {
  mysqlConnection.query('SELECT * FROM alarma ', (err, rows, fields) => {
    if (!err) {
      res.json(rows);
    } else {
      console.log(err);
    }
  });
});



alarma.post('/nueva-alarma', (req, res) => {
  const { cuidado, fecha, hora, cada_cuando, id_planta } = req.body;
  let alarmaN = [cuidado, fecha, hora, cada_cuando, id_planta];
  let nuevaAlarma = `INSERT INTO alarma (cuidado, fecha, hora, cada_cuando, id_planta)
                  VALUES(?,?,?,?,?)`;
  mysqlConnection.query(nuevaAlarma, alarmaN, (err, results, fields) => {
    if (err) {
      return console.error(err.message);
    }
    res.json({ message: `Nueva alarma agregada`, })
  });
});



alarma.put('/alarma/:id', (req, res) => {
  const { cuidado, fecha, hora, cada_cuando, id_planta } = req.body;
  const { id_alarma } = req.params;
  mysqlConnection.query(`UPDATE alarma SET cuidado = ?, fecha = ?, hora = ?, cada_cuando = ?, id_planta = ?`,
    [cuidado, fecha, hora, cada_cuando, id_planta], (err, rows, fields) => {
      if (!err) {
        res.json({ status: 'Alarma actualizada' });
      } else {
        console.log(err);
      }
    });
});



alarma.delete('/alarma/:id_alarma', (req, res) => {
  const { id_alarma } = req.params;
  mysqlConnection.query('DELETE FROM alarma WHERE id_alarma = ?',
    [id_alarma], (err, rows, fields) => {
      if (!err) {
        res.json({ status: 'Alarma eliminada' });
      } else {
        console.log(err);
      }
    });
});


module.exports = alarma;