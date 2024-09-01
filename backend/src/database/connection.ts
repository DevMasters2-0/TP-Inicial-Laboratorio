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

    this.db = new sqlite3.Database('mydatabase.sqlite', (err) => {
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

    this.db.run("PRAGMA foreign_keys = ON;", (err:Error) =>{
      if (err) {
        console.error("FK's no habilitadas");
      }
      else{
        console.log("FK's habilitadas");
      }

    });

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

  crearIncidencia(incidencia: Incidencia){
    
    this.db.run("INSERT INTO incidencia (incidencia_id, nombre, dni, email, tema, nivelDeRiesgo, localidad, descripcion, fechaDeCreacion, latitud, longitud, estado) VALUES(?,?,?,?,?,?,?,?,?,?,?,?)",[incidencia.id, incidencia.nombre, incidencia.dni, incidencia.email, incidencia.tema,incidencia.nivelDeRiesgo, incidencia.localidad, incidencia.descripcion, incidencia.fechaDeCreacion, null, null, incidencia.estado], 
      function error(err:Error) {
        if (err) {
          console.error("Error al crear la incidencia", err);
        }else{
          console.log("Incidencia creada con exito")
        }
    });

  }

  deleteIncidenciaById(id: number){

    this.db.run("DELETE FROM incidencia WHERE incidencia.incidencia_id == :id", { ':id': id }, (err:Error) =>{
      if (err) {
        console.error("Error al borrar la incidencia", err);
      }
      else{
        console.log("Incidencia eliminada con exito");
      }
    });
  }

  close(){
    this.db.close();
  }

}

let db = new DatabaseWrapper();
export default db;