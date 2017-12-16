import { Component, OnInit } from '@angular/core';
import {OfertasService} from '../ofertas.service'
import { Observable } from 'rxjs/Observable';
import {Oferta} from '../shared/oferta.model'
import { Subject } from 'rxjs/Subject';

import 'rxjs/add/operator/switchMap'

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
    .switchMap((termo:string) => {
      console.log('requisição http para a api: ' , termo)
      return this.ofertasService.pesquisaOfertas(termo)

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
