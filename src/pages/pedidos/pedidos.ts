import { PedidoDTOId } from '../../models/pedido.dtoid';
import { PedidoService } from './../../services/domain/pedido.service';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';


@IonicPage()
@Component({
  selector: 'page-pedidos',
  templateUrl: 'pedidos.html',
})
export class PedidosPage {

  items: PedidoDTOId[];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public pedidoService: PedidoService) {
  }

  ionViewDidLoad() {
    this.pedidoService.findAll().
      subscribe(response => {
        this.items = response;
      },
        error => { });
  }

  showPedidos(pedido_id: string) {
    this.navCtrl.push('PedidosDetailPage', { pedido_id: pedido_id });
  }

}
