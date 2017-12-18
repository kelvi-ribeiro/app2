import { Component, OnInit } from '@angular/core';
import { ActivatedRoute,Params } from '@angular/router';
import {OfertasService} from '../../ofertas.service'

@Component({
  selector: 'app-onde-fica',
  templateUrl: './onde-fica.component.html',
  styleUrls: ['./onde-fica.component.css']
})
export class OndeFicaComponent implements OnInit {

  public ondeFica:string = ''

  constructor(
          private route:ActivatedRoute,
          private ofertaService:OfertasService
  ) { }

  ngOnInit() {
    this.route.parent.params.subscribe((parametros:Params)=>{
      this.ofertaService.getOndeFicaOfertaPorId(parametros.id)
      .then((OndeFica:string)=>{
        this.ondeFica = OndeFica
      })
    })
    
  }

}
