import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ModeloCliente } from 'src/app/modelos/cliente.modelo';
import { ClientesService } from 'src/app/servicios/clientes.service';
declare var M: any;


@Component({
  selector: 'app-editar-cliente',
  templateUrl: './editar-cliente.component.html',
  styleUrls: ['./editar-cliente.component.css']
})
export class EditarClienteComponent implements OnInit {
  id:string= '';

  fgValidador: FormGroup = this.fb.group({
    'id': ['', [Validators.required]],
    'nombre': ['', [Validators.required]],
    'apellidos': ['',[Validators.required]],
    'email': ['',[Validators.required, Validators.email]],
    'fechaNacimiento':['',[Validators.required]],
    'numDocumento':['',[Validators.required]],
    'tipoDocumento':['',[Validators.required]],
    'telefono': ['',[Validators.required]]
  });
  
  constructor(private fb:FormBuilder,
    private servicioCliente: ClientesService, 
    private router: Router, 
    private route: ActivatedRoute  
  ) { }

  ngOnInit(): void {
    this.inicializarElementos();
    this.id = this.route.snapshot.params["id"];
    this.buscarCliente();
  }

  buscarCliente(){
    this.servicioCliente.obtenerRegistrosPorId(this.id).subscribe((datos:ModeloCliente)=>{
      this.fgValidador.controls["id"].setValue(this.id);
      this.fgValidador.controls["nombre"].setValue(datos.nombre);
      this.fgValidador.controls["apellidos"].setValue(datos.apellidos);
      this.fgValidador.controls["email"].setValue(datos.email);
      this.fgValidador.controls["fechaNacimiento"].setValue(datos.fechaNacimiento);
      this.fgValidador.controls["numDocumento"].setValue(datos.numDocumento);
      this.fgValidador.controls["tipoDocumento"].setValue(datos.tipoDocumento);
      this.fgValidador.controls["telefono"].setValue(datos.telefono);
    });
  }

  inicializarElementos(){
    var elems = document.querySelectorAll('select');
    var elemsDate = document.querySelectorAll('.datepicker');
    M.Datepicker.init(elemsDate);
    M.FormSelect.init(elems);  
  }

  editarCliente(){
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
    c.id = this.id;

    this.servicioCliente.actualizarCliente(c).subscribe((datos: ModeloCliente)=>{
      alert("Cliente actualizado correctamente");
      this.router.navigate(["/administracion/clientes"]);
    },(error:any)=>{
      alert("Error en la actualización de cliente");
    })

  }

}
