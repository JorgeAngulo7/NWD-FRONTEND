import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { from } from 'rxjs';
import { SeguridadService } from 'src/app/servicios/seguridad.service';
import { SeguridadModule } from '../seguridad.module';
import * as CryptoJS from 'crypto-js';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-identificacion',
  templateUrl: './identificacion.component.html',
  styleUrls: ['./identificacion.component.css']
})
export class IdentificacionComponent implements OnInit {

  fgValidador: FormGroup = this.fb.group({
    'usuario': ['',[Validators.required, Validators.email]],
    'clave': ['',[Validators.required]]
  });
  constructor(private fb: FormBuilder, private servicoSeguridad : SeguridadService, private router: Router) { }

  ngOnInit(): void {
  }

  identificacionUsuario(){
    let usuario = this.fgValidador.controls["usuario"].value;
    let clave = this.fgValidador.controls["clave"].value;
    let claveCifrada = CryptoJS.MD5(clave).toString();
    this.servicoSeguridad.identificar(usuario,clave).subscribe((datos: any) => {
      this.servicoSeguridad.almacenarSesion(datos);
      this.router.navigate(["/inicio"]);
      console.log("Datos Correctos");
    }, (error : any) => {
      // KO
      alert("Datos Invalidos")
    })
  }

}
