const mysql = require('mysql');
const settings = require('./db_settings.json');
const databaseConnection = mysql.createConnection(settings);
const fileSystem = require('fs');
const tableName = 'fighters';
const outputFile = './public/output.json';

// Establish connection
databaseConnection.connect((error) => {
  if (error) throw error;
  console.log('Connected!');
});

databaseConnection.query('SELECT * FROM ' + tableName, function(error, results) {
  if (error) throw error;
  console.log(results);

  fileSystem.writeFile(outputFile, JSON.stringify(results), 'utf8', function(error) {
    if (error) {
      console.log('Error occured while writing JSON object to file.');
      return console.log(error);
    }
    console.log('JSON file saved!');
  });
});

// Close connection
databaseConnection.end();