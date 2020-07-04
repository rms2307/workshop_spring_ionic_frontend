import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EditarDadosClientePage } from './editar-dados-cliente';

@NgModule({
  declarations: [
    EditarDadosClientePage,
  ],
  imports: [
    IonicPageModule.forChild(EditarDadosClientePage),
  ],
})
export class EditarDadosClientePageModule {}
