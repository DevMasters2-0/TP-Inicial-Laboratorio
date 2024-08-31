import error from 'console';
import { readFileSync } from 'fs';
import Database from 'sqlite3';
import sqlite3 from 'sqlite3';
import { Incidencia } from '../models/incidencias.models';

export interface DatabaseSQL{
  getIncidencias():any;
  getImages(id:number):any;
}

class DatabaseWrapper {
  private db: sqlite3.Database;

  constructor() {

    this.db = new sqlite3.Database(':memory:', (err) => {
      if (err) {
        console.error('Error al crear la base de datos:', err.message);
      } else {
        console.log('Creada la base de datos SQLite.');
      }
    });
    this.init();
  }

  init() {
    const sql = readFileSync('src/database/database.sql', 'utf8');

    this.db.exec(sql, (err) => {
      if (err) {
        console.error('Error al ejecutar el archivo SQL:', err);
      } else {
        console.log('Archivo SQL ejecutado con éxito.');
      }
    });
  }

  getIncidencias(): Promise<Array<Incidencia>> {
    return new Promise((resolve, reject) => {
      let incidencias: Array<Incidencia> = [];
  
      this.db.each("SELECT * FROM incidencia;", (err: Error, row: Incidencia) => {
        if (err) {
          console.error('Fallo la operación', err);
          reject(err); // Rechaza la promesa si hay un error
        } else {
          incidencias.push(row); // Agrega la fila al array
        }
      }, (err) => {
        if (err) {
          reject(err); // Rechaza la promesa si hay un error en el conteo final
        } else {
          resolve(incidencias); // Resuelve la promesa una vez que todas las filas han sido procesadas
        }
      });
    });
  }
  

  async getIncidenciaById(id: number):Promise<Incidencia>{
    return new Promise<Incidencia>((resolve, reject) => {
      
      this.db.get("SELECT * FROM incidencia WHERE incidencia_id == :id", { ':id': id }, (err: Error, row: Incidencia) => {
        
        if (err) {
          reject(err);
        }else{
          resolve(row);
        }

      });
    })
  }

  close(){
    this.db.close();
  }

}

let db = new DatabaseWrapper();
export default db;