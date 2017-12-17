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

  private temValorPesquisa:boolean = false
  public ofertas:Observable<Oferta[]>
  private ofertasRetornadas:Oferta[]
  private subjectPesquisa:Subject<string> = new Subject<string>()

  constructor(private ofertasService:OfertasService) { }

  ngOnInit() {
    this.ofertas = this.subjectPesquisa //retorno Oferta[]
    .debounceTime(1000) // Executa a ação do switchmap após um segundo
    .distinctUntilChanged() // para fazer pesquisas distintas
    .switchMap((termo:string) => {
      console.log('requisição http para a api: ' , termo)

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

    this.ofertas.subscribe((ofertas:Oferta[])=>{
      this.ofertasRetornadas = ofertas
      
      if(this.ofertasRetornadas.length==0){
        this.temValorPesquisa = true
      }
    })
  }

  public pesquisa(termoDaBusca:string):void{
    console.log('keyup caracter: ' , termoDaBusca)
    this.subjectPesquisa.next(termoDaBusca)
    
  }

}
