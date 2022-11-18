import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { observableToBeFn } from 'rxjs/internal/testing/TestScheduler';
import { ModeloCliente } from '../modelos/cliente.modelo';

@Injectable({
  providedIn: 'root'
})
export class ClientesService {

  url = 'http://localhost:3000';

  constructor(private http:HttpClient) { }

  obtenerRegistros():Observable<ModeloCliente[]>{
    return this.http.get<ModeloCliente[]>(`${this.url}/clientes`);
  }

  obtenerRegistrosPorId(id:string):Observable<ModeloCliente>{
    return this.http.get<ModeloCliente>(`${this.url}/clientes/${id}`);
  }

  crearCliente(cliente: ModeloCliente): Observable<ModeloCliente>{
    return this.http.post<ModeloCliente>(`${this.url}/clientes`,cliente);
  }

  actualizarCliente(cliente: ModeloCliente): Observable<ModeloCliente>{
    return this.http.put<ModeloCliente>(`${this.url}/clientes/${cliente.id}`,cliente);
  }

  eliminarCliente(id : string): Observable<any>{
    return this.http.delete(`${this.url}/clientes/${id}`);
  }

}
