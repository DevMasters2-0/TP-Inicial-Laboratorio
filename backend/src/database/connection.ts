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

    this.db = new sqlite3.Database('src/database/mydatabase.sqlite', (err) => {
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
  
// crud basico
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
    
    this.db.run("INSERT INTO incidencia (incidencia_id, nombre, dni, email, tema, nivelDeRiesgo, localidad, descripcion, fechaDeCreacion, latitud, longitud, estado, image_url) VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?)",[incidencia.id, incidencia.nombre, incidencia.dni, incidencia.email, incidencia.tema,incidencia.nivelDeRiesgo, incidencia.localidad, incidencia.descripcion, new Date(), incidencia.ubicacion.latitud, incidencia.ubicacion.longitud, incidencia.estado, incidencia.image_url], 
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

  async updateIncidenciaById(id:number, incidencia:Incidencia){
    this.db.run("UPDATE incidencia SET tema = $tema, estado = $estado  WHERE incidencia_id = $id", {$tema: incidencia.tema, $estado: incidencia.estado, $id: incidencia.id}, (err:Error) => {
      if (err) {
        console.error("Error al hacer el update de la incidencia", err);
      }
      else{
        console.log("Incidencia mejorada con exito");
      }
    });
  }

 //Filtros particulares
  async getIncidenciasByTema(tema:string): Promise<Array<Incidencia>>{

    return new Promise<Array<Incidencia>>((resolve, reject) => {
      this.db.all("SELECT * from incidencia WHERE tema = ?", tema, (err: Error, rows: Array<Incidencia>) => {
        if (err) {
          console.error("Error al obtener las incidencias por tema", err);
          reject(err);
        }
        else {
          console.log("Incidencias obtenidas con exito");
          resolve(rows);
        }
        
      });

    });

  }

  async getIncidenciasByRiesgo(riesgo:string): Promise<Array<Incidencia>>{

    return new Promise<Array<Incidencia>>((resolve, reject) => {
      this.db.all("SELECT * from incidencia WHERE nivelDeRiesgo = ?", riesgo, (err: Error, rows: Array<Incidencia>) => {
        if (err) {
          console.error("Error al obtener las incidencias por riesgo", err);
          reject(err);
        }
        else {
          console.log("Incidencias obtenidas con exito");
          resolve(rows);
        }
        
      });

    });

  }

  async getIncidenciasByLocalidad(localidad:string): Promise<Array<Incidencia>>{

    return new Promise<Array<Incidencia>>((resolve, reject) => {
      this.db.all("SELECT * from incidencia WHERE localidad = ?", localidad, (err: Error, rows: Array<Incidencia>) => {
        if (err) {
          console.error("Error al obtener las incidencias por localidad", err);
          reject(err);
        }
        else {
          console.log("Incidencias obtenidas con exito");
          resolve(rows);
        }
        
      });

    });

  }

  async getIncidenciasByEstado(estado:string): Promise<Array<Incidencia>>{

    return new Promise<Array<Incidencia>>((resolve, reject) => {
      this.db.all("SELECT * from incidencia WHERE estado = ?", estado, (err: Error, rows: Array<Incidencia>) => {
        if (err) {
          console.error("Error al obtener las incidencias por estado", err);
          reject(err);
        }
        else {
          console.log("Incidencias obtenidas con exito");
          resolve(rows);
        }
        
      });

    });

  }
  
  obtenerIncidenciasPorFecha(fecha: string): Promise<Array<Incidencia>> {
    
    return new Promise<Array<Incidencia>>((resolve, reject) => {
      this.db.all("SELECT * from incidencia WHERE fechaDeCreacion = ?", fecha, (err: Error, rows: Array<Incidencia>) => {
        if (err) {
          console.error("Error al obtener las incidencias por fecha de creacion", err);
          reject(err);
        }
        else {
          console.log("Incidencias obtenidas con exito");
          resolve(rows);
        }
        
      });
      
    });
  }
  

  close(){
    this.db.close();
  }

}

let db = new DatabaseWrapper();
export default db;