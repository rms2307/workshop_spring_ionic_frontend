import { PedidoService } from './../../services/domain/pedido.service';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ConfirmacaoPedidoPage } from './confirmacao-pedido';

@NgModule({
  declarations: [
    ConfirmacaoPedidoPage,
  ],
  imports: [
    IonicPageModule.forChild(ConfirmacaoPedidoPage),
  ],
  providers: [
    PedidoService,
  ]
})
export class ConfirmacaoPedidoPageModule { }
