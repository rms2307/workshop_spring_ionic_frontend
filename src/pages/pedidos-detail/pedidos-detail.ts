import { ItemPedidoFullDTO } from './../../models/item-pedido-full.dto';
import { EnderecoDTO } from './../../models/endereco.dto';
import { PedidoService } from './../../services/domain/pedido.service';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';




@IonicPage()
@Component({
  selector: 'page-pedidos-detail',
  templateUrl: 'pedidos-detail.html',
})
export class PedidosDetailPage {

  id: string;
  data: string;
  total: string;
  endereco: EnderecoDTO;
  itens: ItemPedidoFullDTO[];



  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public pedidoService: PedidoService,) {
  }

  ionViewDidLoad() {
    let pedido_id = this.navParams.get('pedido_id');
    this.pedidoService.findById(pedido_id)
      .subscribe(response => {
        this.id = response['id'];
        this.data = response['instante'];

        this.itens = response['itens'];

        this.endereco = response['enderecoDeEntrega'];
        this.total = response['valorTotal'];
      },
        error => { });
  }
}
