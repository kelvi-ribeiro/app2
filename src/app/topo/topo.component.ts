import { Component, OnInit } from '@angular/core';
import {OfertasService} from '../ofertas.service'
import { Observable } from 'rxjs/Observable';
import {Oferta} from '../shared/oferta.model'
import { Subject } from 'rxjs/Subject';

import 'rxjs/add/operator/switchMap'
import 'rxjs/add/operator/debounceTime'
import 'rxjs/add/operator/distinctUntilChanged'
import 'rxjs/add/operator/catch'
import 'rxjs/add/observable/of'
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
    .distinctUntilChanged()
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
      console.log(ofertas)
    })
  }

  public pesquisa(termoDaBusca:string):void{
    console.log('keyup caracter: ' , termoDaBusca)
    this.subjectPesquisa.next(termoDaBusca)
    
  }

}
