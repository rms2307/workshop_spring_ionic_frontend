import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { NovoEditarProdutoPage } from './novo-editar-produto';

@NgModule({
  declarations: [
    NovoEditarProdutoPage,
  ],
  imports: [
    IonicPageModule.forChild(NovoEditarProdutoPage),
  ],
})
export class NovoEditarProdutoPageModule {}
