const mysql = require('mysql');
const mysqlConnection = mysql.createConnection({
  host: 'bkhdve6frlqtzwmxph5b-mysql.services.clever-cloud.com',
  user: 'ueccg7yeayt3mjly',
  password: 'JVecGmDgY79mslweGGp2',
  database: 'bkhdve6frlqtzwmxph5b',
  multipleStatements: true
});
mysqlConnection.connect(function(err) {
  if (err) {
    console.error(err);
    return;
  } else {
    console.log('Base de Datos conectada!');
  }
});

module.exports = mysqlConnection;