import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router'
import {Oferta} from '../shared/oferta.model'
import {OfertasService} from '../ofertas.service'
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';
@Component({
  selector: 'app-oferta',
  templateUrl: './oferta.component.html',
  styleUrls: ['./oferta.component.css'],
  providers:[OfertasService]
})
export class OfertaComponent implements OnInit {
  public oferta:Oferta
  

  constructor(private route:ActivatedRoute,
              private ofertasService:OfertasService) { }

  ngOnInit() {
     this.ofertasService.getOfertaPorId(this.route.snapshot.params['id'])
     .then((oferta:Oferta)=>{
       this.oferta = oferta
       //console.log(this.oferta)
     })


     let tempo = Observable.interval(1000)

     tempo.subscribe((intervalo:number)=>{
       console.log(intervalo)
     })


   // this.route.params.subscribe((parametro:any)=>{ Recurso de Subscribe
     /// console.log(parametro.id)  Recurso de Subscribe
   // })

  //  this.route.params.subscribe((parametro:any)=>{console.log(parametro)},
  //   (erro:any)=>console.log(erro),
  //   () => console.log('Processamento foi classificado como concluído!')
  
  //   )


  }


}
