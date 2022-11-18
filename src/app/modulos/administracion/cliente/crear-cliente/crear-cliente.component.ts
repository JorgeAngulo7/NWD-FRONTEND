import { Component, ElementRef, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Route, Router } from '@angular/router';
import { ModeloCliente } from 'src/app/modelos/cliente.modelo';
import { ClientesService } from 'src/app/servicios/clientes.service';
declare var M: any;

@Component({
  selector: 'app-crear-cliente',
  templateUrl: './crear-cliente.component.html',
  styleUrls: ['./crear-cliente.component.css']
})
export class CrearClienteComponent implements OnInit {

  fgValidador: FormGroup = this.fb.group({
    'nombre': ['', [Validators.required]],
    'apellidos': ['',[Validators.required]],
    'email': ['',[Validators.required, Validators.email]],
    'fechaNacimiento':['',[Validators.required]],
    'numDocumento':['',[Validators.required]],
    'tipoDocumento':['',[Validators.required]],
    'telefono': ['',[Validators.required]]
  });
  
  constructor(private fb:FormBuilder, private servicioCliente: ClientesService, private router: Router) { }

  ngOnInit(): void {
    this.inicializarElementos();
  }

  inicializarElementos(){
    var elems = document.querySelectorAll('select');
    var elemsDate = document.querySelectorAll('.datepicker');
    M.Datepicker.init(elemsDate);
    M.FormSelect.init(elems);  
  }

  GuardarCliente(){
    let nombre = this.fgValidador.controls["nombre"].value;
    let apellidos = this.fgValidador.controls["apellidos"].value;
    let email = this.fgValidador.controls["email"].value;
    let fechaNacimiento = this.fgValidador.controls["fechaNacimiento"].value;
    let numDocumento = this.fgValidador.controls["numDocumento"].value;
    let tipoDocumento = this.fgValidador.controls["tipoDocumento"].value;
    let telefono = this.fgValidador.controls["telefono"].value;

    let c = new ModeloCliente();
    c.nombre= nombre;
    c.apellidos=apellidos;
    c.fechaNacimiento = fechaNacimiento;
    c.email = email;
    c.numDocumento = numDocumento;
    c.tipoDocumento = tipoDocumento;
    c.telefono = telefono;
    c.empresaId="1";

    this.servicioCliente.crearCliente(c).subscribe((datos: ModeloCliente)=>{
      alert("Cliente creado correctamente");
      this.router.navigate(["/administracion/clientes"]);
    },(error:any)=>{
      alert("Error en la creación de cliente");
    })

  }
}
