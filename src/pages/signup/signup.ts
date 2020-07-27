import { EnderecoService } from './../../services/domain/endereco.service';
import { ClienteService } from './../../services/domain/cliente.service';
import { CidadeDTO } from './../../models/cidade.dto';
import { EstadoService } from './../../services/domain/estado.service';
import { CidadeService } from './../../services/domain/cidade.service';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { EstadoDTO } from '../../models/estado.dto';


@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})

export class SignupPage {

  formGroup: FormGroup;
  cidades: CidadeDTO[];
  estados: EstadoDTO[];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public formBuilder: FormBuilder,
    public cidadeService: CidadeService,
    public estadoService: EstadoService,
    public clienteSerice: ClienteService,
    public alertCtrl: AlertController,
    public endereco: EnderecoService,) {

    this.formGroup = this.formBuilder.group({
      nome: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(120)]],
      email: ['', [Validators.required, Validators.email]],
      tipo: ['', [Validators.required]],
      cpfOuCnpj: ['', [Validators.required, Validators.minLength(11), Validators.maxLength(14)]],
      senha: ['', [Validators.required]],
      logradouro: ['', [Validators.required]],
      numero: ['', [Validators.required]],
      complemento: ['', []],
      bairro: ['', [Validators.required]],
      cep: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(8)]],
      telefone: ['', [Validators.required]],
      estado: ['', [Validators.required]],
      cidade: ['', [Validators.required]]
    });
  }

  ionViewDidLoad() {

  }

  buscaCEP() {
    var validacep = /^[0-9]{8}$/;
    if (validacep.test(this.formGroup.value.cep)) {
      this.endereco.findEnderecoByCEP(this.formGroup.value.cep)
        .subscribe(response => {
          this.formGroup.controls.logradouro.setValue(response['logradouro']);
          this.formGroup.controls.bairro.setValue(response['bairro']);
          this.formGroup.controls.estado.setValue(response['uf']);
          this.formGroup.controls.cidade.setValue(response['localidade']);
        },
          error => {
          });
    }
  }

  signupUser() {
    this.clienteSerice.insert(this.formGroup.value)
      .subscribe(response => {
        this.showInsertOk();
      },
        error => { });
  }

  showInsertOk() {
    let alert = this.alertCtrl.create({
      title: 'Sucesso!',
      message: 'Cadastro efetuado com sucesso',
      enableBackdropDismiss: false,
      buttons: [
        {
          text: 'Ok',
          handler: () => {
            this.navCtrl.pop();
          }
        }
      ]
    });
    alert.present();
  }
}


