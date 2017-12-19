import { Component, OnInit, Input } from '@angular/core';


@Component({
  selector: 'app-ordem-compra-sucesso',
  templateUrl: './ordem-compra-sucesso.component.html',
  styleUrls: ['./ordem-compra-sucesso.component.css']
})
export class OrdemCompraSucessoComponent implements OnInit {
  @Input() public idPedidoCompra:number = 0 //IMPORTANTE, SE TIVESSEMOS ATRIBUTOS COM NOMES DIFERENTES
                                            //DEVERIA-SE INFORMAR NO @Input('Atributo que recebe do pai')
  
  constructor() { }

  ngOnInit() {
  }
  
}
