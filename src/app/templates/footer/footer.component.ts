import { Component, OnInit } from '@angular/core';
import { modeloIdentificar } from 'src/app/modelos/identificar.modelo';
import { SeguridadService } from 'src/app/servicios/seguridad.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  inicioSesion: boolean = false;
  subs: Subscription = new Subscription();

  constructor(private seguridadServicio: SeguridadService) { }

  ngOnInit(): void {
    this.subs =this.seguridadServicio.obtenerDatosUsuarioEnSesion().subscribe((datos: modeloIdentificar) =>{
      this.inicioSesion = datos.estaIdentificado;
    })
  }

}
