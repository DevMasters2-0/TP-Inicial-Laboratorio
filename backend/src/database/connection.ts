import error  from 'console';
import { readFileSync } from 'fs';
import Database  from 'sqlite3';
import sqlite3 from 'sqlite3';
import { Incidencia } from '../models/incidencias.models';



let db = new sqlite3.Database(':memory:', (err) =>{
  if (err) {
    console.error('Error al conectar con la base de datos:', err.message);
  } else {
    console.log('Creada la base de datos SQLite.');
   
  }
})

const sql = readFileSync('database.sql', 'utf8');

db.exec(sql, (err) => {
  if (err) {
    console.error('Error al ejecutar el archivo SQL:', err);
  } else {
    console.log('Archivo SQL ejecutado con éxito.');
  }
});

db.each("SELECT * FROM incidencia;", (err: Error, row: Object) => {

  try {
    console.log(row);
  } catch (err) {
    console.error('Fallo la operacion', err);
  }

 
});
db.close(); // Cierra la conexión a la base de datos
export default db;