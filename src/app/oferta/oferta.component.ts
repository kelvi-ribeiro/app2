import { Component, OnInit, OnDestroy } from '@angular/core';
import {ActivatedRoute} from '@angular/router'
import {Oferta} from '../shared/oferta.model'
import {OfertasService} from '../ofertas.service'
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';
import { Observer } from 'rxjs/Observer';
import {Subscription} from 'rxjs/Subscription'
@Component({
  selector: 'app-oferta',
  templateUrl: './oferta.component.html',
  styleUrls: ['./oferta.component.css'],
  providers:[OfertasService]
})
export class OfertaComponent implements OnInit, OnDestroy {

  private tempoObservableSubscription:Subscription
  private meuObservableTesteSubscription:Subscription


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
     
          this.tempoObservableSubscription = tempo.subscribe((intervalo:number)=>{
            console.log(intervalo)
          })


     //observable (observável)

     let meuObservableTeste = Observable.create((observer:Observer<string>)=>{
       observer.next('Primeiro evento da stream')
       observer.next('Segundo evento da stream')
       observer.complete()
      //  observer.error('Algum erro foi encontrado na stream de ventos')


     })


     //obersavable (observador)

     this.meuObservableTesteSubscription = meuObservableTeste.subscribe(
       (resultado:any)=> console.log(resultado),
       (erro:string)=> console.log(erro),
       () => console.log('Stream de eventos foi finalizada')

     )

    }

  ngOnDestroy(){
    this.meuObservableTesteSubscription.unsubscribe()
    this.tempoObservableSubscription.unsubscribe()
  }


   


   // this.route.params.subscribe((parametro:any)=>{ Recurso de Subscribe
     /// console.log(parametro.id)  Recurso de Subscribe
   // })

  //  this.route.params.subscribe((parametro:any)=>{console.log(parametro)},
  //   (erro:any)=>console.log(erro),
  //   () => console.log('Processamento foi classificado como concluído!')
  
  //   )


  


}
