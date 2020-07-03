import { ClienteService } from './../../services/domain/cliente.service';
import { EmailDTO } from './../../models/email.dto';
import { AuthService } from './../../services/auth.service';
import { Component } from '@angular/core';
import { NavController, IonicPage, MenuController, AlertController } from 'ionic-angular';
import { CredenciaisDTO } from '../../models/Credenciais.dto';
import { DomSanitizer } from '@angular/platform-browser';

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  creds: CredenciaisDTO = {
    email: "moraes_rsilv@hotmail.com",
    senha: ""
  }

  email: EmailDTO;

  constructor(
    public navCtrl: NavController,
    public menu: MenuController,
    public auth: AuthService,
    public clienteService: ClienteService,
    public alertCtl: AlertController,
    public sanitizer: DomSanitizer) {

  }

  ionViewWillEnter() {
    this.menu.swipeEnable(false);
  }

  ionViewDidLeave() {
    this.menu.swipeEnable(true);
  }

  ionViewDidEnter() {
    this.auth.refreshToken()
      .subscribe(response => {
        this.auth.successfulLogin(response.headers.get('Authorization'));
        this.navCtrl.setRoot('CategoriasPage');
      },
        error => { });
  }

  login() {
    this.auth.authenticate(this.creds)
      .subscribe(response => {
        this.auth.successfulLogin(response.headers.get('Authorization'));
        this.navCtrl.setRoot('CategoriasPage');
      },
        error => { });
  }

  signup() {
    this.navCtrl.push('SignupPage');
  }

  forgot() {
    this.email = { email: this.creds.email }
    this.auth.forgot(this.email)
      .subscribe(response => {
        this.showAlert();
      },
        error => { });

  }

  showAlert() {
    let alert = this.alertCtl.create({
      title: 'Esqueci a senha!',
      message: 'Nova senha enviada para email de cadastro',
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
