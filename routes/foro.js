const express =require('express');
const foro = express.Router();

const mysqlConnection = require ('../db/database');



foro.get('/foro', (req, res) => {
     
  mysqlConnection.query('SELECT * FROM foro ', (err, rows, fields) => {
      if (!err) {
        res.json(rows);
      } else {
        console.log(err);
      }
    });
 });






module.exports = foro;