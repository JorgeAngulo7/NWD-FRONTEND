import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { modeloIdentificar } from '../modelos/identificar.modelo';

@Injectable({
  providedIn: 'root'
})
export class SeguridadService {

  url = 'http://localhost:3000'
  datosUsuarioEnSesion = new BehaviorSubject<modeloIdentificar>(new modeloIdentificar());

  constructor(private http: HttpClient) { 
    this.verificarSesion();
  }

  verificarSesion(){
    let datos = this.obtenerInfoSesion();
    if(datos){
      this.refrescarDatosSesion(datos);
    }
  }

  refrescarDatosSesion(datos:modeloIdentificar){
    this.datosUsuarioEnSesion.next(datos);
  }

  obtenerDatosUsuarioEnSesion(){
    return this.datosUsuarioEnSesion.asObservable();
  }

  identificar(usuario:string, clave:string): Observable<modeloIdentificar>{
    return this.http.post<modeloIdentificar>(`${this.url}/identificarPersona`, {
      usuario: usuario,
      clave: clave
    },{
      headers:new HttpHeaders({

      })
    })
  }

  almacenarSesion(datos:modeloIdentificar){ //Alamacenamiento en el localStorage
    datos.estaIdentificado = true;
    let stringDatos = JSON.stringify(datos);
    localStorage.setItem("datosSesion",stringDatos);
    this.refrescarDatosSesion(datos);
  }

  obtenerInfoSesion(){
    let datosString = localStorage.getItem("datosSesion");
    if(datosString){
      let datos = JSON.parse(datosString);
      return datos;
    }else{
      return null;
    }
  }

  EliminarInfoSesion(){
    localStorage.removeItem("datosSesion");
    this.refrescarDatosSesion(new modeloIdentificar());
  }

  seHaIniciadoSesion(){
    let datosString = localStorage.getItem("datosSesion");
    return datosString;
  }

  obtnerToken(){
    let datosString = localStorage.getItem("datosSesion");
    if(datosString){
      let datos = JSON.parse(datosString);
      return datos.tk;
    }else{
      return ' ';
    }
  }

}
