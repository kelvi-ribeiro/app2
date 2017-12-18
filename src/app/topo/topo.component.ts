import { Component, OnInit } from '@angular/core';
import {OfertasService} from '../ofertas.service'
import { Observable } from 'rxjs/Observable';
import {Oferta} from '../shared/oferta.model'
import { Subject } from 'rxjs/Subject';

import '../util/rxjs-extensions'

@Component({
  selector: 'app-topo',
  templateUrl: './topo.component.html',
  styleUrls: ['./topo.component.css'],
  providers:[OfertasService]
})
export class TopoComponent implements OnInit {

  
  public ofertas:Observable<Oferta[]>
 
  private subjectPesquisa:Subject<string> = new Subject<string>()

  constructor(private ofertasService:OfertasService) { }

  ngOnInit() {
    this.ofertas = this.subjectPesquisa //retorno Oferta[]
    .debounceTime(1000) // Executa a ação do switchmap após um segundo
    .distinctUntilChanged() // para fazer pesquisas distintas
    .switchMap((termo:string) => {
     

      if(termo.trim() ===''){
        //retornar um observable de array de ofertas vazio
        
        return Observable.of<Oferta[]>([])
      }
      return this.ofertasService.pesquisaOfertas(termo)

    })

      .catch((erro:any)=>{
        console.log(erro)
        
        return Observable.of<Oferta[]>([])
      })

   
  }

  public pesquisa(termoDaBusca:string):void{
       
    this.subjectPesquisa.next(termoDaBusca)
    
  }

  public limpaPesquisa():void{
    this.subjectPesquisa.next('')
  }

}
