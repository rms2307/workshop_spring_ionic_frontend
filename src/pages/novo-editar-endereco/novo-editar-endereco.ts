import { ClienteService } from './../../services/domain/cliente.service';
import { EstadoDTO } from './../../models/estado.dto';
import { CidadeService } from './../../services/domain/cidade.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { CidadeDTO } from '../../models/cidade.dto';
import { EstadoService } from '../../services/domain/estado.service';
import { StorageService } from '../../services/storage.service';

@IonicPage()
@Component({
  selector: 'page-novo-editar-endereco',
  templateUrl: 'novo-editar-endereco.html',
})
export class NovoEditarEnderecoPage {

  formGroup: FormGroup;
  cidades: CidadeDTO[];
  estados: EstadoDTO[];
  endereco_id: string;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public formBuilder: FormBuilder,
    public cidadeService: CidadeService,
    public estadoService: EstadoService,
    public clienteService: ClienteService,
    public alertCtrl: AlertController,
    public storage: StorageService) {

    this.formGroup = this.formBuilder.group({
      logradouro: [this.navParams.get('logradouro'), [Validators.required]],
      numero: [this.navParams.get('numero'), [Validators.required]],
      complemento: [this.navParams.get('complemento'), [Validators.required]],
      bairro: [this.navParams.get('bairro'), [Validators.required]],
      cep: [this.navParams.get('cep'), [Validators.required, Validators.minLength(8), Validators.maxLength(8)]],
      estado_id: [null, [Validators.required]],
      cidade_id: [null, [Validators.required]]
    });
  }

  ionViewDidLoad() {
    this.endereco_id = this.navParams.get('endereco_id');
    this.estadoService.findAll()
      .subscribe(response => {
        this.estados = response;
        if (this.navParams.get('estadoId')) {
          this.formGroup.controls.estado_id.setValue(this.navParams.get('estadoId'));
        } else {
          this.formGroup.controls.estado_id.setValue(this.estados[0].id);
        }
        this.updateCidades();
      },
        error => { })
  }

  updateCidades() {
    let estado_id = this.formGroup.value.estado_id;
    this.cidadeService.findAll(estado_id)
      .subscribe(response => {
        this.cidades = response;
        this.formGroup.controls.cidade_id.setValue(this.navParams.get('cidadeId'));
      },
        error => { });
  }

  saveEndereco() {
    let obj = {
      logradouro: this.formGroup.value.logradouro,
      numero: this.formGroup.value.numero,
      complemento: this.formGroup.value.complemento,
      bairro: this.formGroup.value.bairro,
      cep: this.formGroup.value.cep,
      cidade_id: this.formGroup.value.cidade_id,
      cliente_id: this.navParams.get('cli_id')
    };
    this.clienteService.addEndereco(obj)
      .subscribe(response => {
        this.showInsertOk();
      },
        error => { });
  }

  updateEndereco() {
    let obj = {
      logradouro: this.formGroup.value.logradouro,
      numero: this.formGroup.value.numero,
      complemento: this.formGroup.value.complemento,
      bairro: this.formGroup.value.bairro,
      cep: this.formGroup.value.cep,
      cidade_id: this.formGroup.value.cidade_id,
      cliente_id: this.navParams.get('cli_id')
    };
    this.clienteService.updateEndereco(obj, this.navParams.get('endereco_id'))
      .subscribe(response => {
        this.showInsertOk();
      },
        error => { });
  }

  showInsertOk() {
    let alert = this.alertCtrl.create({
      title: 'Sucesso!',
      message: 'Endereço salvo',
      enableBackdropDismiss: false,
      buttons: [
        {
          text: 'Ok',
          handler: () => {
            this.navCtrl.setRoot('EnderecoPage');
          }
        }
      ]
    });
    alert.present();
  }
}
