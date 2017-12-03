import {Http} from '@angular/http'
import {Injectable} from '@angular/core'
import { Oferta } from './shared/oferta.model'
import 'rxjs/add/operator/toPromise'

@Injectable()
export class OfertasService {
    constructor(private http:Http){

    }

   
    public getOfertas(): Promise<Oferta[]> {
        //efetuar uma requisição http
       return this.http.get('http://localhost:3000/ofertas')
        .toPromise()
        .then((resposta:any)=>resposta.json())
        //retornar um promise Oferta[]
    }
}
//     public getOfertas2(): Promise<Oferta[]> {
//         return new Promise((resolve, reject) => {
//             //algum tipo de processamento, que ao finalizar, chama a função resolve ou a função reject
//             //console.log('será que passou por aqui?')
//             let deu_certo = true
            
//             if(deu_certo) {
//                 setTimeout(() => resolve( this.ofertas ), 3000)
                
//             } else {
//                 reject({ codigo_erro: 404, mensagem_erro: 'Servidor não encontrado XYZ' })
//             }
//         })
//         .then(( ofertas: Oferta[]) => {
//             //fazer alguma tratativa
//             console.log('primeiro then')
//             return ofertas
//         })
//         .then(( ofertas: Oferta[]) => {
//             //fazer uma outra tratativa
//             console.log('segundo then')
//             return new Promise((resolve2, reject2) => {
//                 setTimeout(() => { resolve2( ofertas ) },3000)
//             })
//         })
//         .then(( ofertas: Oferta[] ) => {
//             console.log('terceiro then executado após 3 segundos porque estava aguardando uma promisse ser resolvida')
//             return ofertas
//         })
//     }
// }