import { Component, OnInit } from '@angular/core';
import { ModeloCliente } from 'src/app/modelos/cliente.modelo';
import { ClientesService } from 'src/app/servicios/clientes.service';

@Component({
  selector: 'app-buscar-cliente',
  templateUrl: './buscar-cliente.component.html',
  styleUrls: ['./buscar-cliente.component.css']
})
export class BuscarClienteComponent implements OnInit {
  
  listadoRegistros: ModeloCliente[]=[];
  
  constructor(private clienteServicio: ClientesService) { }

  ngOnInit(): void {
    this.obtenerListaClientes();
  }

  obtenerListaClientes(){
    this.clienteServicio.obtenerRegistros().subscribe((datos:ModeloCliente[])=>{
      this.listadoRegistros = datos;
    })
  }
}
