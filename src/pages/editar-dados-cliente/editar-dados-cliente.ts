import { ClienteUpdateDTO } from './../../models/cliente-update.dto';
import { StorageService } from './../../services/storage.service';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { ClienteService } from '../../services/domain/cliente.service';


@IonicPage()
@Component({
  selector: 'page-editar-dados-cliente',
  templateUrl: 'editar-dados-cliente.html',
})
export class EditarDadosClientePage {

  formGroup: FormGroup;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public formBuilder: FormBuilder,
    public clienteService: ClienteService,
    public alertCtrl: AlertController,
  ) {
    this.formGroup = this.formBuilder.group({
      nome: [this.navParams.get('nome'), [Validators.required, Validators.minLength(1), Validators.maxLength(120)]],
      email: [this.navParams.get('email'), [Validators.required, Validators.email]],
      telefone: [this.navParams.get('telefone'), [Validators.required]],
    });
  }

  update() {
    this.clienteService.update(this.formGroup.value, this.navParams.get('id'))
      .subscribe(response => {
        this.showInsertOk();
      },
        error => { });
  }

  showInsertOk() {
    let alert = this.alertCtrl.create({
      title: 'Sucesso!',
      message: 'Dados atualizado',
      enableBackdropDismiss: false,
      buttons: [
        {
          text: 'Ok',
        }
      ]
    });
    alert.present();
  }


}
