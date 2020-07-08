import { EnderecoDTO } from './../../models/endereco.dto';
import { StorageService } from './../../services/storage.service';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { ClienteService } from '../../services/domain/cliente.service';

@IonicPage()
@Component({
  selector: 'page-endereco',
  templateUrl: 'endereco.html',
})
export class EnderecoPage {

  enderecos: EnderecoDTO[];
  cli_id: string;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public clienteService: ClienteService,
    public storage: StorageService,
    public alertCtrl: AlertController) {
  }

  ionViewDidLoad() {
    let localUser = this.storage.getLocalUser();
    if (localUser && localUser.email) {
      this.clienteService.findByEmail(localUser.email)
        .subscribe(response => {
          this.enderecos = response['enderecos'];
          this.cli_id = response['id']
        },
          error => { });
    }
  }

  goEditOrAdd(cli_id, endereco_id, logradouro, numero, complemento, bairro, cep, cidadeId, estadoId) {
    this.navCtrl.push('NovoEditarEnderecoPage', {
      cli_id: cli_id,
      endereco_id: endereco_id,
      logradouro: logradouro,
      numero: numero,
      complemento: complemento,
      bairro: bairro,
      cep: cep,
      cidadeId: cidadeId,
      estadoId: estadoId
    });
  }

  delete(id: string) {
    this.clienteService.deleteEndereco(id)
      .subscribe(response => { },
        error => { });
  }

  showAlertDelete(id: string) {
    let alert = this.alertCtrl.create({
      title: 'Excluir',
      message: 'Excluir endereço?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {
          }
        },
        {
          text: 'SIM',
          handler: () => {
            this.delete(id);
            this.navCtrl.setRoot('EnderecoPage');
          }
        }
      ]
    });
    alert.present();
  }
}


