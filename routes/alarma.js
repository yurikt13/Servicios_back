const express =require('express');
const alarma = express.Router();

const mysqlConnection = require ('../db/database');



alarma.get('/alarma', (req, res) => {
     
  mysqlConnection.query('SELECT * FROM alarma ', (err, rows, fields) => {
      if (!err) {
        res.json(rows);
      } else {
        console.log(err);
      }
    });
 });



alarma.post('/nueva-alarma',(req,res)=>{

const {idAlarma, cuidado, fecha, hora, cadaCuando} = req.body;

let alarmaN = [idAlarma, cuidado, fecha, hora, cadaCuando];

let nuevaAlarma = `INSERT INTO alarma (idAlarma, cuidado, fecha, hora, cadaCuando)
                  VALUES(?,?,?,?,?)`;
mysqlConnection.query(nuevaAlarma, alarmaN, (err, results, fields) => {
  if (err) {
    return console.error(err.message);
  }
  res.json({ message:`Nueva Alarma`, })
  });
}); 





module.exports = alarma;